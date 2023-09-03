import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeletePromotionClientService {
  async execute({ id }: IRequest) {
    const promotionAlreadyExists = await prisma.promotionClient.findUnique({
      where: {
        id,
      },
    })

    if (!promotionAlreadyExists) {
      throw new AppError('Promotion not found', 404)
    }

    const promotionClient = await prisma.promotionClient.delete({
      where: {
        id,
      },
    })

    return promotionClient
  }
}

export default new DeletePromotionClientService()
