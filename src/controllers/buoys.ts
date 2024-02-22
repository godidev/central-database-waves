import { BuoyModel } from '../models/buoy.ts'

export class BuoyController {
  static async getBuoys(req, res) {
    try {
      const buoys = await BuoyModel.getBuoys()
      res.json(buoys)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
