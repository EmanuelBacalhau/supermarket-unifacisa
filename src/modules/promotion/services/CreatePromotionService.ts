import prisma from '../../../config/Prisma'

interface IRequest {
  name?: string
  percentage: number
  startDate: Date
  endDate: Date
}

class CreatePromotionService {
  async execute({ name, percentage, startDate, endDate }: IRequest) {
    const promotion = await prisma.promotion.create({
      data: {
        name,
        percentage,
        startDate,
        endDate,
      },
    })

    return promotion
  }
}

export default new CreatePromotionService()
