import { Request, Response } from 'express'
import { z } from 'zod'
import CreateEmployeeService from '../services/CreateEmployeeService'

class EmployeeController {
  async create(req: Request, res: Response) {
    const EmployeeSchema = z.object({
      name: z.string().nonempty(),
      birthday: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      cpf: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = EmployeeSchema.parse(req.body)

    const user = await CreateEmployeeService.execute(data)

    return res.status(201).json(user)
  }
}

export default new EmployeeController()
