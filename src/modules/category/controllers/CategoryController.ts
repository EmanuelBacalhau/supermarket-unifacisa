import { Request, Response } from 'express'
import { z } from 'zod'
import CreateCategoryService from '../services/CreateCategoryService'

class CategoryController {
  async create(req: Request, res: Response) {
    const CategorySchema = z.object({
      name: z.string().nonempty(),
    })

    const { name } = CategorySchema.parse(req.body)

    const category = await CreateCategoryService.execute({ name })

    return res.status(201).json(category)
  }
}

export default new CategoryController()
