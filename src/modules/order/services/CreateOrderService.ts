import prisma from '../../../config/Prisma'

interface IRequest {
  productId: string
  clientId: string
  amount: number
}

class CreateOrderService {
  async execute({ productId, clientId, amount }: IRequest) {
    const order = await prisma.order.create({
      data: { clientId, productId, amount },
    })

    return order
  }
}

export default new CreateOrderService()
