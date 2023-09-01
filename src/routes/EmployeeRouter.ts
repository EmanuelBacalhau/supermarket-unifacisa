import { Router } from 'express'
import EmployeeController from '../modules/employee/controllers/EmployeeController'

class EmployeeRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/employees/register', EmployeeController.create)
    this.router.get('/employees/:id', EmployeeController.show)
    this.router.put('/employees/:id', EmployeeController.update)
    this.router.delete('/employees/:id', EmployeeController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new EmployeeRouter()
