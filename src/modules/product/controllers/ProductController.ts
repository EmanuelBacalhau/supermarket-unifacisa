import { Request, Response } from 'express'
import { z } from 'zod'
import CreateProductService from '../services/CreateProductService'
import GetProductService from '../services/GetProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ListProductService from '../services/ListProductService'

class ProductController {
  async index(req: Request, res: Response) {
    const products = await ListProductService.execute()
    return res.status(200).json(products)
  }

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

  async update(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })
    const ProductSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().nonnegative().optional(),
      categoryId: z.string().cuid().optional(),
      barCode: z.string().optional(),
      manufacturingDate: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
      expirationDate: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
    })

    const { id } = FindSchema.parse(req.params)
    const data = ProductSchema.parse(req.body)

    const product = await UpdateProductService.execute({ id, ...data })

    return res.status(200).json(product)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const product = await DeleteProductService.execute({ id })

    return res.status(200).json(product)
  }
}

export default new ProductController()
