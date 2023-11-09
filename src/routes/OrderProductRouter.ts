import { Router } from 'express'

import createOrderProductController from '../modules/order_product/controllers/create-order-product.controller'
import deleteOrderProductController from '../modules/order_product/controllers/delete-order-product.controller'
import addAmountOrderProductController from '../modules/order_product/controllers/add-amount-order-product.controller'
import removeAmountOrderProductController from '../modules/order_product/controllers/remove-amount-order-product.controller'

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
    this.router.put(
      '/ordersProducts/:id/add',
      addAmountOrderProductController.handle,
    )
    this.router.put(
      '/ordersProducts/:id/remove',
      removeAmountOrderProductController.handle,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderProductRouter()
