import { Router } from 'express'
import OrderController from '../modules/order/controllers/OrderController'

class OrderRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/orders', OrderController.index)
    this.router.post('/orders/register', OrderController.create)
    this.router.get('/orders/:id', OrderController.show)
    this.router.put('/orders/:id', OrderController.update)
    this.router.delete('/orders/:id', OrderController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderRouter()
