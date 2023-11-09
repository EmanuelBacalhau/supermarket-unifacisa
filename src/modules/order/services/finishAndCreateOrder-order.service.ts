import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderId: string
}

class FinishAndCreateOrder {
  async execute({ orderId }: IRequest) {
    const isOrderExists = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!isOrderExists) {
      throw new AppError('Order not found', 404)
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        finalized: true,
      },
    })

    const newOrder = await prisma.order.create({
      data: {
        cartId: isOrderExists.cartId,
      },
    })

    return newOrder.id
  }
}

export default new FinishAndCreateOrder()
