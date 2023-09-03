import { Router } from 'express'
import PromotionClientController from '../modules/promotionClient/controllers/PromotionClientController'

class PromotionClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post(
      '/promotionClients/register',
      PromotionClientController.create,
    )
    this.router.delete(
      '/promotionClients/:id',
      PromotionClientController.delete,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new PromotionClientRouter()
