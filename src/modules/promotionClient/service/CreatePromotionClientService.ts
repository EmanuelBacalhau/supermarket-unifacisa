import prisma from '../../../config/Prisma'

interface IRequest {
  productIds: string[]
  clientId: string
  promotionId: string
}

class CreatePromotionClientService {
  async execute({ clientId, promotionId, productIds }: IRequest) {
    productIds.forEach(async (productId) => {
      await prisma.promotionClient.create({
        data: {
          clientId,
          productId,
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
