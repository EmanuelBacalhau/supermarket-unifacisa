import { Router } from 'express'
import PromotionController from '../modules/promotion/controllers/PromotionController'

class PromotionRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/promotions/register', PromotionController.create)
    this.router.get('/promotions/:id', PromotionController.show)
    this.router.put('/promotions/:id', PromotionController.update)
    this.router.delete('/promotions/:id', PromotionController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new PromotionRouter()
