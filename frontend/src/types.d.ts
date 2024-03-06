export interface Buoy {
  _id: string
  height: number
  period: number
  day: number
  month: number
  year: number
  hour: number
  avgPeriod: number
  avgDirection: number
  peakDirection: number
}

export interface SurfForecast {
  wind: {
    speed: number
    direction: {
      angle: number
      letters: string
    }
  }
  _id: string
  day: number
  hour: number
  month: number
  year: number
  energy: string
  height: number
  period: number
  waveDirecton: number
}
