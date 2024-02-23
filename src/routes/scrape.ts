import Router from 'express'
import cron from 'node-cron'
import { BuoyController } from '../controllers/buoys.ts'
import { scheduledUpdate } from '../utils/buoys.ts'

export const scrapeRouter = Router()

scrapeRouter.get('/buoys', BuoyController.addNewBuoys)

cron.schedule('0 0,12 * * *', async () => {
  try {
    await scheduledUpdate()
    console.log('Buoy data updated successfully!')
  } catch (err) {
    console.error(err)
  }
})
