import express, { json } from 'express'
const app = express()
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import { buoysRouter } from './routes/buoys.ts'
import { scrapeRouter } from './routes/scrape.ts'
import { SurfForecastRouter } from './routes/surf-forecast.ts'
const { PORT, MONGO_URL } = process.env

app.use(json())

app.use('/buoys', buoysRouter)
app.use('/scrape', scrapeRouter)
app.use('/surf-forecast', SurfForecastRouter)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err))
