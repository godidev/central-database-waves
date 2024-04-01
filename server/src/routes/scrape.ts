import Router from 'express'
import cron from 'node-cron'
import { BuoyController } from '../controllers/buoys.ts'
import { SurfForecastController } from '../controllers/surf-forecast.ts'
import { scheduledUpdate as scheduledUpdateBuoys } from '../utils/buoys.ts'
import { scheduledUpdate as scheduledUpdateSurfForecast } from '../utils/surfForecast.ts'

export const scrapeRouter = Router()

scrapeRouter.get('/buoys', BuoyController.addNewBuoysToDB)
scrapeRouter.get('/surf-forecast', SurfForecastController.fetchSurfForecast)

cron.schedule('05,35 */2 * * *', async () => {
  try {
    await scheduledUpdateBuoys()
  } catch (err) {
    console.error(err)
  }
  try {
    await scheduledUpdateSurfForecast()
  } catch (err) {
    console.error(err)
  }
})
