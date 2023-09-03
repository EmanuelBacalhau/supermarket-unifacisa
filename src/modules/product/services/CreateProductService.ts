import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
  price: number
  amount: number
  description: string
  categoryId: string
  barCode: string
  manufacturingDate: Date
  expirationDate: Date
}

class CreateProductService {
  async execute({
    name,
    price,
    amount,
    description,
    categoryId,
    barCode,
    manufacturingDate,
    expirationDate,
  }: IRequest) {
    const productAlreadyExists = await prisma.product.findUnique({
      where: {
        barCode,
      },
    })

    if (productAlreadyExists) {
      throw new AppError('Product already exists', 409)
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
        description,
        categoryId,
        barCode,
        manufacturingDate,
        expirationDate,
      },
    })

    return product
  }
}

export default new CreateProductService()
