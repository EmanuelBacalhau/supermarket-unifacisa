import { Router } from 'express'
import EmployeeController from '../modules/controllers/EmployeeController'

class EmployeeRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/employees/register', EmployeeController.create)
  }

  public get getRouter() {
    return this.router
  }
}

export default new EmployeeRouter()
