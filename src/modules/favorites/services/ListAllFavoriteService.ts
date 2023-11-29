import prisma from '../../../config/Prisma'

interface IRequest {
  clientId: string
}

class ListAllFavoriteService {
  async execute({ clientId }: IRequest) {
    return await prisma.favorite.findMany({
      where: {
        clientId,
      },
    })
  }
}

export default new ListAllFavoriteService()
