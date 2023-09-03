import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class GetPromotionService {
  async execute({ id }: IRequest) {
    const promotionAlreadyExists = await prisma.promotion.findUnique({
      where: {
        id,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found', 404)
    }

    return promotionAlreadyExists
  }
}

export default new GetPromotionService()
