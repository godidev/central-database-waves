import { BuoyFetch, DbBuoyRecord, formatedBuoys, id, value } from '../types.js'
import { BuoyModel } from '../models/buoy.ts'
import buoys from '../../buoyData.json'

async function fetchBuoys({
  station,
  body,
}: {
  station: string
  body: string[]
}): Promise<BuoyFetch[] | void> {
  try {
    const response = await fetch(
      `https://portus.puertos.es/portussvr/api/RTData/station/${station}?locale=es`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,es;q=0.8',
          'content-type': 'application/json;charset=UTF-8',
          Referer: 'https://portus.puertos.es/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `${body}`,
        method: 'POST',
      },
    )
    const res = await response.json()
    return res as BuoyFetch[]
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

function organizeData(data: BuoyFetch[]) {
  return data.map(({ fecha, datos }) => {
    const formattedData: DbBuoyRecord['datos'] = {
      'Periodo de Pico': 0,
      'Altura Signif. del Oleaje': 0,
      'Direcc. Media de Proced.': 0,
      'Direcc. de pico de proced.': 0,
      'Periodo Medio Tm02': 0,
    }

    const deestructuredData = Object.fromEntries(
      Object.entries(formattedData).map(([key, value]) => [
        key.replace(/\./g, ''),
        value,
      ]),
    )

    datos.forEach(({ id, valor, nombreParametro }) => {
      const newName = nombreParametro.replace(/\./g, '')
      const formattedValue = formatValue(id, valor)
      deestructuredData[newName] = formattedValue
    })

    return {
      fecha,
      datos: deestructuredData,
    } as formatedBuoys
  })
}

async function updateBuoysData({ station, body }) {
  const data = await fetchBuoys({ station, body })

  if (!data) {
    return []
  }
  const formatedData = organizeData(data)

  return formatedData
}

export async function scheduledUpdate() {
  try {
    buoys.forEach(async ({ name, station, body }) => {
      console.log('fetching new Buoys')
      const newBuoys = await updateBuoysData({ station, body })
      await BuoyModel.addMultipleBuoys(name, newBuoys)
    })
    console.log('uploaded new Buoys')
  } catch (err) {
    console.error(err)
  }
}
