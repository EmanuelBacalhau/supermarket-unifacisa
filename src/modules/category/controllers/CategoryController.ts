import { Request, Response } from 'express'
import { z } from 'zod'
import CreateCategoryService from '../services/CreateCategoryService'
import GetCategoryService from '../services/GetCategoryService'

class CategoryController {
  async create(req: Request, res: Response) {
    const CategorySchema = z.object({
      name: z.string().nonempty(),
    })

    const { name } = CategorySchema.parse(req.body)

    const category = await CreateCategoryService.execute({ name })

    return res.status(201).json(category)
  }

  async show(req: Request, res: Response) {
    const CategorySchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = CategorySchema.parse(req.params)

    const category = await GetCategoryService.execute({ id })

    return res.status(200).json(category)
  }
}

export default new CategoryController()