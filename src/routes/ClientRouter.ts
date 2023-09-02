import { Router } from 'express'
import ClientController from '../modules/client/controllers/ClientController'

class ClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/clients/register', ClientController.create)
    this.router.get('/clients/:id', ClientController.show)
  }

  public get getRouter() {
    return this.router
  }
}

export default new ClientRouter()
