import { Router } from 'express'
import PromotionClientController from '../modules/promotionClient/controllers/PromotionClientController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'

class PromotionClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post(
      '/promotionClients/register',
      isAuthenticate,
      verifyEmployee,
      PromotionClientController.create,
    )
    this.router.delete(
      '/promotionClients/:id',
      isAuthenticate,
      verifyEmployee,
      PromotionClientController.delete,
    )
    this.router.get(
      '/promotionClients/:promotionId',
      isAuthenticate,
      PromotionClientController.findByPromotionId,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new PromotionClientRouter()
