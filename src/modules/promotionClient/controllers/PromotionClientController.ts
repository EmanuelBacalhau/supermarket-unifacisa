import { Request, Response } from 'express'
import { z } from 'zod'
import CreatePromotionClientService from '../service/CreatePromotionClientService'
import DeletePromotionClientService from '../service/DeletePromotionClientService'

class PromotionClientController {
  async create(req: Request, res: Response) {
    const PromotionClientSchema = z.object({
      productIds: z.array(z.string().cuid().nonempty()),
      clientId: z.string().cuid().nonempty(),
      promotionId: z.string().cuid().nonempty(),
    })

    const data = PromotionClientSchema.parse(req.body)

    const promotionClient = await CreatePromotionClientService.execute(data)

    return res.status(201).json(promotionClient)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid().nonempty(),
    })

    const { id } = FindSchema.parse(req.params)

    const promotionClient = await DeletePromotionClientService.execute({ id })

    return res.status(200).json(promotionClient)
  }
}

export default new PromotionClientController()
