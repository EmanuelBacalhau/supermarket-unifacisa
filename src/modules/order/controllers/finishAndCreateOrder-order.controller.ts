import { Request, Response } from 'express'
import finishAndCreateOrderOrderService from '../services/finishAndCreateOrder-order.service'
import { z } from 'zod'

class FinishOrderAndCreateOrder {
  async handle(req: Request, res: Response) {
    const finishOrder = z.object({
      orderId: z.string().cuid(),
    })

    const { orderId } = finishOrder.parse(req.params)

    const response = await finishAndCreateOrderOrderService.execute({ orderId })

    return res.status(200).json(response)
  }
}

export default new FinishOrderAndCreateOrder()
