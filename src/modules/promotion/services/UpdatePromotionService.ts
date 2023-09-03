import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
  percentage?: number
  startDate?: Date
  endDate?: Date
}

class UpdatePromotionService {
  async execute({ id, name, percentage, startDate, endDate }: IRequest) {
    const promotionAlreadyExists = await prisma.promotion.findUnique({
      where: {
        id,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found', 404)
    }

    const promotion = await prisma.promotion.update({
      where: {
        id,
      },
      data: {
        name,
        startDate,
        percentage,
        endDate,
      },
    })

    return promotion
  }
}

export default new UpdatePromotionService()
