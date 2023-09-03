import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeletePromotionService {
  async execute({ id }: IRequest) {
    const promotionAlreadyExists = await prisma.promotion.findUnique({
      where: {
        id,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found', 404)
    }

    const promotion = await prisma.promotion.delete({
      where: {
        id,
      },
    })

    return promotion
  }
}

export default new DeletePromotionService()
