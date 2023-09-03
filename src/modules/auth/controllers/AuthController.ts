import { Request, Response } from 'express'
import { z } from 'zod'
import AuthService from '../services/AuthService'

class AuthController {
  async auth(req: Request, res: Response) {
    const AuthSchema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = AuthSchema.parse(req.body)

    const authToken = await AuthService.execute(data)

    return res.status(200).json(authToken)
  }
}

export default new AuthController()
