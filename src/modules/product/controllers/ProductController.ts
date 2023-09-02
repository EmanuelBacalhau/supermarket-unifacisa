import { Request, Response } from 'express'
import { z } from 'zod'
import CreateProductService from '../services/CreateProductService'
import GetProductService from '../services/GetProductService'

class ProductController {
  async create(req: Request, res: Response) {
    const ProductSchema = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      price: z.number().nonnegative(),
      categoryId: z.string().cuid(),
      barCode: z.string().nonempty(),
      manufacturingDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      expirationDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
    })

    const data = ProductSchema.parse(req.body)

    const product = await CreateProductService.execute(data)

    return res.status(201).json(product)
  }

  async show(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const product = await GetProductService.execute({ id })

    return res.status(200).json(product)
  }
}

export default new ProductController()
