import { z } from 'zod'
import CreateOrderService from '../services/CreateOrderService'
import { Request, Response } from 'express'
import GetOrderService from '../services/GetOrderService'

class OrderController {
  async create(req: Request, res: Response) {
    const OrderSchema = z.object({
      productId: z.string().cuid().nonempty(),
      clientId: z.string().cuid().nonempty(),
      amount: z.number().nonnegative(),
    })

    const { clientId, productId, amount } = OrderSchema.parse(req.body)

    const order = await CreateOrderService.execute({
      clientId,
      productId,
      amount,
    })

    return res.status(200).json(order)
  }

  async show(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const order = await GetOrderService.execute({ id })

    return res.status(200).json(order)
  }
}

export default new OrderController()
