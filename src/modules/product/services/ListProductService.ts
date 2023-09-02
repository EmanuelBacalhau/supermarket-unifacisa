import prisma from '../../../config/Prisma'

class ListProductService {
  async execute() {
    const products = await prisma.product.findMany()
    return products
  }
}

export default new ListProductService()
