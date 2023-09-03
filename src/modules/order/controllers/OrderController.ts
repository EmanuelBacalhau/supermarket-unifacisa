import { z } from 'zod'
import CreateOrderService from '../services/CreateOrderService'
import { Request, Response } from 'express'
import GetOrderService from '../services/GetOrderService'
import UpdateOrderService from '../services/UpdateOrderService'
import DeleteOrderService from '../services/DeleteOrderService'
import ListOrderService from '../services/ListOrderService'

class OrderController {
  async index(req: Request, res: Response) {
    const orders = await ListOrderService.execute()

    return res.status(200).json(orders)
  }

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

  async update(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const OrderSchema = z.object({
      productId: z.string().cuid(),
      clientId: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)
    const { productId, clientId } = OrderSchema.parse(req.body)

    const order = await UpdateOrderService.execute({ id, productId, clientId })

    return res.status(200).json(order)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const order = await DeleteOrderService.execute({ id })

    return res.status(200).json(order)
  }
}

export default new OrderController()
