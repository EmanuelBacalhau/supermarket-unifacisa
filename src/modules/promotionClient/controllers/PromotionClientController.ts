import { Request, Response } from 'express'
import { z } from 'zod'
import CreatePromotionClient from '../service/CreatePromotionClient'

class PromotionClientController {
  async create(req: Request, res: Response) {
    const PromotionClientSchema = z.object({
      productIds: z.array(z.string().cuid().nonempty()),
      clientId: z.string().cuid().nonempty(),
      promotionId: z.string().cuid().nonempty(),
    })

    const data = PromotionClientSchema.parse(req.body)

    const promotionClient = await CreatePromotionClient.execute(data)

    return res.status(201).json(promotionClient)
  }
}

export default new PromotionClientController()
