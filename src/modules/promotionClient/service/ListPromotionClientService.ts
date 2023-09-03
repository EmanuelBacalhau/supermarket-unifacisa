import prisma from '../../../config/Prisma'

interface IRequest {
  clientId: string
}

class ListPromotionClientService {
  async execute({ clientId }: IRequest) {
    const promotions = await prisma.promotion.findMany({
      where: {
        promotionsClient: {
          some: {
            clientId,
          },
        },
      },
    })

    return promotions
  }
}

export default new ListPromotionClientService()
