type id = 34 | 13 | 20 | 21 | 32
type value = Pick<fetchData, 'valor'>['valor']

type date = string

export interface allData {
  fecha: date
  datos: fetchData[]
}

export interface fetchData {
  id: id
  nombreParametro: string
  nombreColumna: string
  paramEseoo: string
  valor: string
  factor: number
  unidad: string
  paramQC: boolean
  variable: string
  averia: boolean
}

type formatedBuoys = {
  [day: string]: {
    [hour: string]: {
      'Periodo de Pico': number
      'Altura Signif. del Oleaje': number
      'Direcc. Media de Proced.': number
      'Direcc. de pico de proced.': number
      'Periodo Medio Tm02': number
    }
  }
}

export interface DbBuoyRecord {
  year: number
  month: number
  day: number
  hour: number
  period: number
  height: number
  avgDirection: number
  peakDirection: number
  avgPeriod: number
}

export interface WaveData {
  year: number
  month: number
  day: number
  hour: number
  height: number
  period: number
  waveDirection: number
  wind: {
    speed: number
    direction: {
      angle: number
      letters: string
    }
  }
  energy: string
}
