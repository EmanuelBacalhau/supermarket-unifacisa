import prisma from '../../../config/Prisma'

class ListPromotionService {
  async execute() {
    const promotions = prisma.promotion.findMany()

    return promotions
  }
}

export default new ListPromotionService()
