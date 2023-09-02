import { Router } from 'express'
import CategoryController from '../modules/category/controllers/CategoryController'

class CategoryRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/categories/register', CategoryController.create)
  }

  public get getRouter() {
    return this.router
  }
}

export default new CategoryRouter()
