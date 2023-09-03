import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeleteOrderService {
  async execute({ id }: IRequest) {
    const orderAlreadyExists = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!orderAlreadyExists) {
      throw new AppError('Order not found', 404)
    }

    const order = await prisma.order.delete({
      where: {
        id,
      },
    })

    return order
  }
}

export default new DeleteOrderService()
