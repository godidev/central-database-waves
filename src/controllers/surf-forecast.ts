import { SurfForecastModel } from '../models/surf-forecast.ts'
import { scheduledUpdate } from '../utils/surfForecast.ts'

export class SurfForecastController {
  static async getForecasts(req, res) {
    try {
      const forecasts = await SurfForecastModel.getForecasts()
      res.json(transformData(forecasts))
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err })
    }
  }

  static async addNewForecasts(req, res) {
    try {
      await scheduledUpdate()
      res.status(200).send('Forecast data updated successfully!')
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async fetchSurfForecast(req, res) {
    try {
      const retrieved = await scheduledUpdate()
      await SurfForecastModel.addMultipleForecast(retrieved)
      res.json({ message: 'Forecast data updated successfully!' })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}

function transformData(data) {
  const transformedData = {}
  data.forEach((forecast) => {
    const { year, month, day, hour, ...rest } = forecast

    if (!transformedData[year]) {
      transformedData[year] = {}
    }
    if (!transformedData[year][month]) {
      transformedData[year][month] = {}
    }
    if (!transformedData[year][month][day]) {
      transformedData[year][month][day] = {}
    }
    if (!transformedData[year][month][day][hour]) {
      transformedData[year][month][day][hour] = {}
    }
    transformedData[year][month][day][hour] = rest._doc
  })
  console.log({ transformedData })
  return transformedData
}
