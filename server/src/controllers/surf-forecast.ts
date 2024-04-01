import { SurfForecastModel } from '../models/surf-forecast.ts'
import { scheduledUpdate } from '../utils/surfForecast.ts'

export class SurfForecastController {
  static async getSurfForecasts(req, res) {
    try {
      const { page, limit } = req.query
      const forecasts = await SurfForecastModel.getSurfForecasts({
        page,
        limit,
      })
      res.json(forecasts)
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
