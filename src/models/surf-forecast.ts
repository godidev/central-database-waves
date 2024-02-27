import { Schema, model } from 'mongoose'
import { WaveData } from '../types.ts'

const SurfForecastSchema = new Schema({
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  height: Number,
  period: Number,
  waveDirection: Number,
  wind: {
    speed: Number,
    direction: {
      angle: Number,
      letters: String,
    },
  },
  energy: String,
})

const SurfForecast = model('SurfForecast', SurfForecastSchema)

export class SurfForecastModel {
  static async getForecasts() {
    try {
      const forecast: WaveData[] = await SurfForecast.find().select('-_id -__v')
      return forecast
    } catch (err) {
      throw new Error("Couldn't get forecasts from the database")
    }
  }

  static async getLastForecast() {
    try {
      const lastData: WaveData = await SurfForecast.findOne()
        .sort({ _id: -1 })
        .select('-_id -__v')
      return lastData
    } catch (err) {
      throw new Error("Couldn't get last forecast data from the database")
    }
  }

  static async addMultipleForecast(forecast) {
    try {
      forecast.forEach(async (data) => {
        await SurfForecast.findOneAndUpdate(
          {
            day: data.day,
            hour: data.hour,
            month: data.month,
            year: data.year,
          },
          data,
          {
            upsert: true,
          },
        )
      })
    } catch (err) {
      throw new Error("Couldn't add multiple forecasts to the database")
    }
  }
}
