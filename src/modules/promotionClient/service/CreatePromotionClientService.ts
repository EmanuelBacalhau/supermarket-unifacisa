import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  clientId: string
  promotionId: string
}

class CreatePromotionClientService {
  async execute({ clientId, promotionId }: IRequest) {
    const promotionAlreadyExists = await prisma.promotion.findUnique({
      where: {
        id: promotionId,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found')
    }

    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!clientAlreadyExists) {
      throw new AppError('Client not found')
    }

    const orders = await prisma.order.findMany({
      where: {
        clientId,
      },
      select: {
        product: {
          select: {
            categoryId: true,
          },
        },
      },
      orderBy: {
        product: {
          category: {
            name: 'asc',
          },
        },
      },
    })

    if (orders.length === 0) {
      throw new AppError('The client does not have to buy')
    }

    const productsByCategory = await prisma.product.findMany({
      where: {
        categoryId: orders[0].product.categoryId,
      },
    })

    productsByCategory.forEach(async (product) => {
      await prisma.promotionClient.create({
        data: {
          clientId,
          productId: product.id,
          promotionId,
        },
      })
    })

    return {
      status: true,
    }
  }
}

export default new CreatePromotionClientService()
