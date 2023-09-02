import { Router } from 'express'
import ProductController from '../modules/product/controllers/ProductController'

class ProductRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/products/register', ProductController.create)
  }

  public get getRouter() {
    return this.router
  }
}

export default new ProductRouter()
