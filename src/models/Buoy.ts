import { Schema, model } from 'mongoose'

export const waveSchema = new Schema({
  day: String,
  hour: String,
  period: Number,
  height: Number,
  avgDirection: Number,
  peakDirection: Number,
  avgPeriod: Number,
})

export const Buoy = model('Buoy', waveSchema)
