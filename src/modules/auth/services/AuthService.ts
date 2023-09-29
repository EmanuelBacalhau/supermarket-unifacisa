import { compareSync } from 'bcryptjs'
import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'
import { sign } from 'jsonwebtoken'
import { Client, Employee } from '@prisma/client'

interface IRequest {
  email: string
  password: string
}

class AuthService {
  async execute({ email, password }: IRequest) {
    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (!employee) {
      throw new AppError('Client/Employee not found', 401)
    }

    const decryptedPassword = compareSync(password, employee?.password)

    if (!decryptedPassword) {
      throw new AppError('Client/Employee not found', 401)
    }

    const JWT_SECRET = process.env.JWT_SECRET as string

    const payload = {
      id: employee.id,
      role: employee.role,
    }

    const token = sign(payload, JWT_SECRET, {
      expiresIn: '1d',
      subject: employee.id,
    })

    return {
      token,
    }
  }
}

export default new AuthService()
