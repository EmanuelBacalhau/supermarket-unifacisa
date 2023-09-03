import { Router } from 'express'
import OrderController from '../modules/order/controllers/OrderController'
import { isAuthenticate } from '../middleware/isAuthenticate'

class OrderRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/orders', isAuthenticate, OrderController.index)
    this.router.post('/orders/register', isAuthenticate, OrderController.create)
    this.router.get('/orders/:id', isAuthenticate, OrderController.show)
    this.router.put('/orders/:id', isAuthenticate, OrderController.update)
    this.router.delete('/orders/:id', isAuthenticate, OrderController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderRouter()
