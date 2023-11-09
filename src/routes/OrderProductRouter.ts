import { Router } from 'express'

import createOrderProductController from '../modules/order_product/controllers/create-order-product.controller'
import deleteOrderProductController from '../modules/order_product/controllers/delete-order-product.controller'

class OrderProductRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post(
      '/ordersProducts/register',
      createOrderProductController.handle,
    )
    this.router.delete(
      '/ordersProducts/:id',
      deleteOrderProductController.handle,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderProductRouter()
