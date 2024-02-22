import express, { json } from 'express'
const app = express()
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import { scheduledUpdate } from './utils/buoys.ts'
import cron from 'node-cron'
import { buoysRouter } from './routes/buoys.ts'
const { PORT, MONGO_URL } = process.env

app.use(json())

app.use('/buoys', buoysRouter)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err))

cron.schedule('0 0,12 * * *', () => {
  try {
    scheduledUpdate().then(() => {
      console.log('done')
    })
  } catch (err) {
    console.error(err)
  }
})
