import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  productId: string
  clientId: string
  amount: number
}

class CreateOrderService {
  async execute({ productId, clientId, amount }: IRequest) {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      throw new AppError('Client not found', 404)
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    if (product.amount < amount) {
      throw new AppError('Insufficient stock')
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        amount: product.amount - amount,
      },
    })

    const order = await prisma.order.create({
      data: { clientId, productId, amount },
    })

    return order
  }
}

export default new CreateOrderService()
