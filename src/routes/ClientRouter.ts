import { Router } from 'express'
import ClientController from '../modules/client/controllers/ClientController'

class ClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/clients', ClientController.index)
    this.router.post('/clients/register', ClientController.create)
    this.router.get('/clients/:id', ClientController.show)
    this.router.put('/clients/:id', ClientController.update)
    this.router.delete('/clients/:id', ClientController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new ClientRouter()
