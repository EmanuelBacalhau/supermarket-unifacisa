import { Request, Response } from 'express'
import { z } from 'zod'
import CreatePromotionService from '../services/CreatePromotionService'

class PromotionController {
  async create(req: Request, res: Response) {
    const PromotionSchema = z.object({
      name: z.string().optional(),
      percentage: z.number().nonnegative(),
      startDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      endDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
    })

    const data = PromotionSchema.parse(req.body)

    const promotion = await CreatePromotionService.execute(data)

    return res.status(200).json(promotion)
  }
}

export default new PromotionController()
