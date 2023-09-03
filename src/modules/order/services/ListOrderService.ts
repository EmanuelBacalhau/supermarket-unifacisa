import prisma from '../../../config/Prisma'

class ListOrderService {
  async execute() {
    const orders = await prisma.order.findMany()

    return orders
  }
}

export default new ListOrderService()
