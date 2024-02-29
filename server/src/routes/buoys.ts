import Router from 'express'
import { BuoyController } from '../controllers/buoys.ts'

export const buoysRouter = Router()

buoysRouter.get('/', BuoyController.getBuoys)
