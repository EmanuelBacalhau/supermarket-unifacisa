import { Request, Response } from 'express'
import { z } from 'zod'
import CreatePromotionService from '../services/CreatePromotionService'
import GetPromotionService from '../services/GetPromotionService'
import UpdatePromotionService from '../services/UpdatePromotionService'
import DeletePromotionService from '../services/DeletePromotionService'
import ListPromotionService from '../services/ListPromotionService'

class PromotionController {
  async index(req: Request, res: Response) {
    const promotions = await ListPromotionService.execute()
    return res.status(200).json(promotions)
  }

  async create(req: Request, res: Response) {
    const PromotionSchema = z.object({
      name: z.string().optional(),
      percentage: z.number().nonnegative(),
      startDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      endDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
    })

    const data = PromotionSchema.parse(req.body)

    const promotion = await CreatePromotionService.execute(data)

    return res.status(201).json(promotion)
  }

  async show(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid().nonempty(),
    })

    const { id } = FindSchema.parse(req.params)

    const promotion = await GetPromotionService.execute({ id })

    return res.status(200).json(promotion)
  }

  async update(req: Request, res: Response) {
    const PromotionSchema = z.object({
      name: z.string().optional(),
      percentage: z.number().nonnegative().optional(),
      startDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element))
        .optional(),
      endDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element))
        .optional(),
    })

    const FindSchema = z.object({
      id: z.string(),
    })

    const data = PromotionSchema.parse(req.body)
    const { id } = FindSchema.parse(req.params)

    const promotion = await UpdatePromotionService.execute({ id, ...data })

    return res.status(200).json(promotion)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid().nonempty(),
    })

    const { id } = FindSchema.parse(req.params)

    const promotion = await DeletePromotionService.execute({ id })

    return res.status(200).json(promotion)
  }
}

export default new PromotionController()
