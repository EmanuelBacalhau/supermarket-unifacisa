import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
  birthday?: Date
  cpf?: string
  email?: string
  password?: string
}

class UpdateClientService {
  async execute({ id, name, birthday, cpf, email, password }: IRequest) {
    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!clientAlreadyExists) {
      throw new AppError('Client not found', 404)
    }

    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        birthday,
        cpf,
        email,
        password,
      },
    })

    return client
  }
}

export default new UpdateClientService()
