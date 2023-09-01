import { Request, Response } from 'express'
import { z } from 'zod'
import CreateEmployeeService from '../services/CreateEmployeeService'
import GetEmployeeService from '../services/GetEmployeeService'

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

  async show(req: Request, res: Response) {
    const EmployeeSchema = z.object({
      id: z.string(),
    })

    const { id } = EmployeeSchema.parse(req.params)

    const employee = await GetEmployeeService.execute({ id })

    return res.status(200).json(employee)
  }
}

export default new EmployeeController()
