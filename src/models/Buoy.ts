import { Schema, model } from 'mongoose'

const buoySchema = new Schema({
  day: String,
  hour: String,
  period: Number,
  height: Number,
  avgDirection: Number,
  peakDirection: Number,
  avgPeriod: Number,
})

const Buoy = model('Buoy', buoySchema)

export class BuoyModel {
  static async getBuoys() {
    return Buoy.find()
  }

  static async getLastBuoy() {
    return Buoy.findOne().sort({ _id: -1 }).select('-_id -__v')
  }

  static async addMultipleBuoys(buoys) {
    return Buoy.insertMany(buoys)
  }
}
