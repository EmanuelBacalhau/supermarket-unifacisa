import { compareSync } from 'bcryptjs'
import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'
import { sign } from 'jsonwebtoken'
import { Client, Employee } from '@prisma/client'

interface IRequest {
  email: string
  password: string
}

interface VerifyUser {
  user: Client | Employee
  password: string
}

class AuthService {
  async execute({ email, password }: IRequest) {
    const client = await prisma.client.findUnique({
      where: {
        email,
      },
    })

    if (client) {
      return this.verifyUser({ user: client, password })
    }

    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (employee) {
      return this.verifyUser({ user: employee, password })
    }

    throw new AppError('Client/Employee not found', 401)
  }

  private verifyUser({ user, password }: VerifyUser) {
    if (user) {
      const verifyPassword = compareSync(password, user.password)

      if (!verifyPassword) {
        throw new AppError('Client/Employee not found', 401)
      }

      const JWT_SECRET = process.env.JWT_SECRET as string

      const payload = {
        id: user.id,
        role: user.role,
      }

      const token = sign(payload, JWT_SECRET, {
        expiresIn: '1d',
        subject: user.id,
      })

      return {
        id: user.id,
        token,
      }
    }
  }
}

export default new AuthService()
