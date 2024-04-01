import { BuoyModel } from '../models/buoy.ts'
import { scheduledUpdate } from '../utils/buoys.ts'

export class BuoyController {
  static async getBuoys(req, res) {
    try {
      const { limit } = req.query
      const buoys = await BuoyModel.getBuoys({ limit })
      res.json(buoys)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async addNewBuoysToDB(req, res) {
    try {
      await scheduledUpdate()
      res.status(200).send('Buoy data updated successfully!')
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async deleteBuoys(req, res) {
    try {
      const { month, day } = req.query
      const convertedMonth = Number(month)
      const convertedDay = Number(day)

      await BuoyModel.deleteBuoys({ month: convertedMonth, day: convertedDay })
      res.status(200).send('Buoy data deleted successfully!')
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
