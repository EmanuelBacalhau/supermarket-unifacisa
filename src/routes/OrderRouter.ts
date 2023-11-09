import { Router } from 'express'
import finishAndCreateOrderOrderController from '../modules/order/controllers/finishAndCreateOrder-order.controller'
import orderDetailsController from '../modules/order/controllers/order-details.controller'

class OrderRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/orders/:orderId/details', orderDetailsController.handle)
    this.router.put(
      '/orders/finish/:orderId',
      finishAndCreateOrderOrderController.handle,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderRouter()
