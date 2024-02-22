import express, { Request, Response, json } from 'express'
const app = express()
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import { scheduledUpdate } from './utils/buoys.ts'
import cron from 'node-cron'
const { PORT, MONGO_URL } = process.env

app.use(json())

app.get('/buoys', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

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
