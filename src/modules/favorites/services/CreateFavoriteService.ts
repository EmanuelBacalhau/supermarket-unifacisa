import prisma from '../../../config/Prisma'

interface IRequest {
  clientId: string
  productId: string
}

class CreateFavoriteService {
  async execute({ clientId, productId }: IRequest) {
    await prisma.favorite.create({
      data: {
        clientId,
        productId,
      },
    })
  }
}

export default new CreateFavoriteService()
