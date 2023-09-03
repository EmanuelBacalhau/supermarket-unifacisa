import { Router } from 'express'
import OrderController from '../modules/order/controllers/OrderController'

class OrderRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/orders/register', OrderController.create)
    this.router.get('/orders/:id', OrderController.show)
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderRouter()
