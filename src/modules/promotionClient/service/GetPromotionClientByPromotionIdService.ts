import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  promotionId: string
}

class GetPromotionClientByPromotionIdService {
  async execute({ promotionId }: IRequest) {
    const promotionAlreadyExists = await prisma.promotionClient.findMany({
      where: {
        promotionId,
      },
      select: {
        promotion: true,
        product: true,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found', 404)
    }

    const currentPromotions = promotionAlreadyExists.map((element) => {
      return {
        name: element.product.name,
        price:
          element.product.price -
          (element.product.price * element.promotion.percentage) / 100,
        description: element.product.description,
        barCode: element.product.barCode,
      }
    })

    return currentPromotions
  }
}

export default new GetPromotionClientByPromotionIdService()
