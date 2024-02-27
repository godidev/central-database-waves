import * as cheerio from 'cheerio'
import { WaveData } from './types.js'

const url =
  'https://es.surf-forecast.com/breaks/Sopelana/forecasts/data?parts=basic&period_types=h&forecast_duration=48h'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9,es;q=0.8',
    cookie: 'last_loc=3580; ',
    '^if-none-match': 'W/^^26736cd3943005b5e3c01a6cf13a8798^^^',
    priority: 'u=1, i',
    referer: 'https://es.surf-forecast.com/breaks/Sopelana/forecasts/latest',
    '^sec-ch-ua': '^^Google',
    'sec-ch-ua-mobile': '?0',
    '^sec-ch-ua-platform': '^^Windows^^^',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'x-csrf-token':
      'fX2oQTDp4Y0cUt8YM8H3V/eKNP1X/Iy2MTOyPLACKmiTLblSBmy78AVmz3xoOB8tbPTyybzKlr1nn6sYZs5teg==',
  },
}

async function fetchSurfForecast() {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data.period_types.h.parts.basic.content
  } catch (err) {
    console.error(err)
  }
}

const surfForecast = await fetchSurfForecast()

const html = `<html><body><table>${surfForecast}</table></body></html>`

const $ = cheerio.load(html)

const waves = $('td.forecast-table__cell.forecast-table-wave-graph__cell')
const energy = $('td.forecast-table__cell.forecast-table-energy__cell > strong')

const data: WaveData[] = []

waves.each((index, element) => {
  const date = $(element).attr('data-date')
  const { period, angle, height } = JSON.parse(
    $(element).attr('data-swell-state'),
  )[0]
  const { speed, direction } = JSON.parse($(element).attr('data-wind'))

  data.push({
    date,
    height,
    period,
    angle,
    wind: {
      speed,
      direction,
    },
    energy: '',
  })
})

energy.each((index, element) => {
  data[index].energy = $(element).text()
})

console.log(data[0].wind)
