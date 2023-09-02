import { hashSync } from 'bcryptjs'
import { AppError } from '../../../errors/AppError'
import prisma from '../../../config/Prisma'

interface IRequest {
  name: string
  birthday: Date
  cpf: string
  email: string
  password: string
}

class CreateClientService {
  async execute({ name, birthday, cpf, email, password }: IRequest) {
    const userByCpf = await prisma.client.findUnique({
      where: {
        cpf,
      },
    })

    const userByEmail = await prisma.client.findUnique({
      where: {
        email,
      },
    })

    if (userByCpf || userByEmail) {
      throw new AppError('Employee already exists', 409)
    }

    const passwordHash = hashSync(password, 16)

    const user = await prisma.client.create({
      data: {
        name,
        birthday,
        cpf,
        email,
        password: passwordHash,
      },
    })

    return user
  }
}

export default new CreateClientService()
