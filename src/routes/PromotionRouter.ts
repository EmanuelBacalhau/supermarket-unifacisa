import { Router } from 'express'
import PromotionController from '../modules/promotion/controllers/PromotionController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'

class PromotionRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/promotions', isAuthenticate, PromotionController.index)
    this.router.post(
      '/promotions/register',
      isAuthenticate,
      verifyEmployee,
      PromotionController.create,
    )
    this.router.get('/promotions/:id', isAuthenticate, PromotionController.show)
    this.router.put(
      '/promotions/:id',
      isAuthenticate,
      verifyEmployee,
      PromotionController.update,
    )
    this.router.delete(
      '/promotions/:id',
      isAuthenticate,
      verifyEmployee,
      PromotionController.delete,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new PromotionRouter()
