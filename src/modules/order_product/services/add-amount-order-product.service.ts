import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderProductId: string
}

class AddAmountOrderProductService {
  async execute({ orderProductId }: IRequest) {
    const isOrderProductExists = await prisma.ordersHasProducts.findUnique({
      where: {
        id: orderProductId,
      },
    })

    if (!isOrderProductExists) {
      throw new AppError('OrderProduct not found', 404)
    }

    await prisma.ordersHasProducts.update({
      where: {
        id: orderProductId,
      },
      data: {
        amount: isOrderProductExists.amount + 1,
      },
    })
  }
}

export default new AddAmountOrderProductService()
