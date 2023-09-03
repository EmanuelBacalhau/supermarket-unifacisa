import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class GetOrderService {
  async execute({ id }: IRequest) {
    const orderAlreadyExists = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!orderAlreadyExists) {
      throw new AppError('Order not found', 404)
    }

    return orderAlreadyExists
  }
}

export default new GetOrderService()
