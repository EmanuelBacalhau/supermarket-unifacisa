import { Request, Response } from 'express'
import { z } from 'zod'
import CreateClientService from '../services/CreateClientService'

class ClientController {
  async create(req: Request, res: Response) {
    const ClientSchema = z.object({
      name: z.string().nonempty(),
      birthday: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      cpf: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = ClientSchema.parse(req.body)

    const client = await CreateClientService.execute(data)

    return res.status(201).json(client)
  }
}

export default new ClientController()
