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

export type formatedBuoys = {
  fecha: string
  datos: {
    [buoyTypes.Altura]: number
    [buoyTypes.Periodo]: number
    [buoyTypes.DireccionMedia]: number
    [buoyTypes.DireccionPico]: number
    [buoyTypes.PeriodoMedio]: number
  }
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

export enum buoyTypes {
  Altura = 'Altura Signif del Oleaje',
  Periodo = 'Periodo de Pico',
  DireccionMedia = 'Direcc Media de Proced',
  DireccionPico = 'Direcc de pico de proced',
  PeriodoMedio = 'Periodo Medio Tm02',
}
