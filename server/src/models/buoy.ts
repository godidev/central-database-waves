import { Schema, model } from 'mongoose'
import { DbBuoyRecord } from '../types.js'

const buoySchema = new Schema({
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  period: Number,
  height: Number,
  avgDirection: Number,
  peakDirection: Number,
  avgPeriod: Number,
})

const Buoy = model('Buoy', buoySchema)

export class BuoyModel {
  static async getBuoys() {
    try {
      const buoys: DbBuoyRecord[] = await Buoy.find()
      return buoys
    } catch (err) {
      throw new Error("Couldn't get buoys from the database")
    }
  }

  static async getLastBuoy() {
    try {
      const lastBuoyData: DbBuoyRecord = await Buoy.findOne()
        .sort({ _id: -1 })
        .select('-_id -__v')
      return lastBuoyData
    } catch (err) {
      throw new Error("Couldn't get last buoy data from the database")
    }
  }

  static async addBuoy(buoys) {
    try {
      console.log({ buoys })
      const data = await Buoy.insertMany(buoys)
      return data
    } catch (err) {
      throw new Error("Couldn't add multiple buoys to the database")
    }
  }

  static async addMultipleBuoys(buoys) {
    try {
      buoys.forEach(async (data) => {
        await Buoy.findOneAndUpdate(
          {
            year: data.year,
            month: data.month,
            day: data.day,
            hour: data.hour,
          },
          data,
          {
            upsert: true,
          },
        )
      })
    } catch (err) {
      throw new Error("Couldn't add multiple buoys to the database")
    }
  }
}
