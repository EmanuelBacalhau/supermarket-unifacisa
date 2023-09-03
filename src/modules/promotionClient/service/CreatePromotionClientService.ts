import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  categoryId: string
  clientId: string
  promotionId: string
}

class CreatePromotionClientService {
  async execute({ clientId, promotionId, categoryId }: IRequest) {
    const categoryAlreadyExists = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!categoryAlreadyExists) {
      throw new AppError('Category not found')
    }

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

    const productsByCategory = await prisma.product.findMany({
      where: {
        categoryId,
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
