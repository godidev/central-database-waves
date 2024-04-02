import { BuoyFetch, formatedBuoys, id, value } from '../types.js'
import { BuoyModel } from '../models/buoy.ts'

async function fetchBuoys(): Promise<BuoyFetch[] | void> {
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

function organizeData(data: BuoyFetch[]): formatedBuoys[] {
  return data.map(({ fecha, datos }) => {
    const formattedData: formatedBuoys['datos'] = {
      'Periodo de Pico': 0,
      'Altura Signif. del Oleaje': 0,
      'Direcc. Media de Proced.': 0,
      'Direcc. de pico de proced.': 0,
      'Periodo Medio Tm02': 0,
    }

    datos.forEach(({ id, valor, nombreParametro }) => {
      const formattedValue = formatValue(id, valor)
      formattedData[nombreParametro] = formattedValue
    })

    return {
      fecha,
      datos: formattedData,
    }
  })
}

async function updateBuoysData() {
  const data = await fetchBuoys()

  if (!data) {
    return []
  }
  const formatedData = organizeData(data)

  return formatedData
}

export async function scheduledUpdate() {
  try {
    const newData = await updateBuoysData()
    await BuoyModel.addMultipleBuoys(newData)
    console.log('uploaded new Buoys')
  } catch (err) {
    console.error(err)
  }
}
