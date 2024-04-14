import { Schema, model } from 'mongoose'
import { DbBuoyRecord } from '../types.js'

const buoySchema = new Schema({
  fecha: String,
  datos: {
    'Periodo de Pico': Number,
    'Altura Signif del Oleaje': Number,
    'Direcc Media de Proced': Number,
    'Direcc de pico de proced': Number,
    'Periodo Medio Tm02': Number,
  },
})

const Buoy = model('Buoy', buoySchema)

export class BuoyModel {
  static async getBuoys({ limit = 6 }: { limit?: number }) {
    try {
      const buoys: DbBuoyRecord[] = await Buoy.find()
        .sort({ fecha: -1 })
        .limit(limit)
        .select('-_id -__v')
      return buoys
    } catch (err) {
      throw new Error("Couldn't get buoys from the database")
    }
  }

  static async deleteBuoys({ month, day }) {
    try {
      await Buoy.deleteMany({ month: month, day: day })
    } catch (err) {
      throw new Error("Couldn't delete buoys from the database")
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
      const data = await Buoy.insertMany(buoys)
      return data
    } catch (err) {
      throw new Error("Couldn't add multiple buoys to the database")
    }
  }

  static async addMultipleBuoys(buoys) {
    try {
      const bulkOps = buoys.map(({ fecha, datos }) => ({
        updateOne: {
          filter: { fecha },
          update: { fecha, datos },
          upsert: true,
        },
      }))
      await Buoy.bulkWrite(bulkOps)
    } catch (err) {
      throw new Error("Couldn't add multiple buoys to the database")
    }
  }
}
