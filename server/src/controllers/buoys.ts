import { BuoyModel } from '../models/buoy.ts'
import { scheduledUpdate } from '../utils/buoys.ts'

export class BuoyController {
  static async getBuoys(req, res) {
    try {
      const limit = Number(req.query.limit) || 0
      const buoys = await BuoyModel.getBuoys({ limit })
      res.json(buoys)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async addNewBuoys(req, res) {
    try {
      await scheduledUpdate()
      res.status(200).send('Buoy data updated successfully!')
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
