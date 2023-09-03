import { Router } from 'express'
import AuthController from '../modules/auth/controllers/AuthController'

class AuthRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/auth', AuthController.auth)
  }

  public get getRouter() {
    return this.router
  }
}

export default new AuthRouter()
