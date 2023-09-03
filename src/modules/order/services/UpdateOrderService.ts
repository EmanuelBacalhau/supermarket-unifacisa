import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  productId?: string
  clientId?: string
}

class UpdateOrderService {
  async execute({ id, productId, clientId }: IRequest) {
    const orderAlreadyExists = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!orderAlreadyExists) {
      throw new AppError('Order not found', 404)
    }

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        clientId,
        productId,
      },
    })

    return order
  }
}

export default new UpdateOrderService()
