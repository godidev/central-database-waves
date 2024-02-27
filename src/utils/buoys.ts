import { BuoyModel } from '../models/buoy.ts'
import { DbBuoyRecord, allData, formatedBuoys, id, value } from '../types.js'

async function getBuoys() {
  try {
    const response = await fetch(
      'https://portus.puertos.es/portussvr/api/RTData/station/2136?locale=es',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,es;q=0.8',
          'content-type': 'application/json;charset=UTF-8',
          Referer: 'https://portus.puertos.es/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: '[34,13,20,21,32]',
        method: 'POST',
      },
    )
    const res = await response.json()
    return organizeData(res)
  } catch (err) {
    return console.error(err)
  }
}

function formatValue(id: id, value: value): number {
  switch (id) {
    case 34:
    case 13:
    case 32:
      return Number(value) / 100
    case 20:
    case 21:
      return Number(value)
    default:
      return 0
  }
}

function organizeData(data: allData[]) {
  return data.reduce((acc, { fecha, datos }) => {
    const [date, time] = fecha.split(' ')
    const day = parseInt(date.split('-')[2])
    const hour = parseInt(time.split(':')[0])

    if (!acc[day]) {
      acc[day] = {}
    }

    if (!acc[day][hour]) {
      acc[day][hour] = {}
    }

    datos.forEach(
      ({ id, nombreParametro, valor }) =>
        (acc[day][hour][nombreParametro] = formatValue(id, valor)),
    )

    return acc
  }, {})
}

async function updateBuoysData() {
  const date = new Date()
  const month = date.getMonth() + 1
  return getBuoys().then((data: formatedBuoys) => {
    return Object.entries(data)
      .map(([day, hours]) => {
        return Object.entries(hours).map(([hour, values]) => {
          const {
            'Direcc. Media de Proced.': avgDirection,
            'Direcc. de pico de proced.': peakDirection,
            'Periodo de Pico': period,
            'Periodo Medio Tm02': avgPeriod,
            'Altura Signif. del Oleaje': height,
          } = values

          return {
            month,
            day: Number(day),
            hour: Number(hour),
            period,
            height,
            avgDirection,
            peakDirection,
            avgPeriod,
          }
        })
      })
      .flat()
  })
}

async function findLastBuoy(): Promise<DbBuoyRecord | null> {
  try {
    const lastBuoyData = await BuoyModel.getLastBuoy()
    return lastBuoyData as DbBuoyRecord
  } catch (err) {
    return null
  }
}

function sliceData(
  lastData: DbBuoyRecord,
  allData: DbBuoyRecord[],
): DbBuoyRecord[] | undefined {
  const index = allData.findIndex(
    (data) => JSON.stringify(data) === JSON.stringify(lastData),
  )
  if (index === -1) {
    console.log('index was not found, uploading all data')
    return allData
  }

  const dataToUpload = allData.slice(index + 1)

  return dataToUpload.length === 0 ? undefined : dataToUpload
}

export async function scheduledUpdate() {
  try {
    const lastBuoy = await findLastBuoy()
    const newData = await updateBuoysData()

    if (!lastBuoy) {
      console.log('there was nothing in the database')
      await BuoyModel.addMultipleBuoys(newData)
      console.log('uploaded ALL data')
      return
    }
    console.log(
      'last record in the database: ',
      lastBuoy,
      'checking if it matches any of the new data',
    )
    const dataToUpload = sliceData(lastBuoy, newData)

    if (!dataToUpload) {
      console.log('no new data to upload')
      return
    }
    await BuoyModel.addMultipleBuoys(dataToUpload)
    console.log('uploaded new data')
  } catch (err) {
    console.error(err)
  }
}
