import Router from 'express'
import { SurfForecastController } from '../controllers/surf-forecast.ts'

export const SurfForecastRouter = Router()

SurfForecastRouter.get('/', SurfForecastController.getForecasts)
