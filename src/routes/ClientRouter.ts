import { Router } from 'express'
import ClientController from '../modules/client/controllers/ClientController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'

class ClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get(
      '/clients',
      isAuthenticate,
      verifyEmployee,
      ClientController.index,
    )
    this.router.post('/clients/register', ClientController.create)
    this.router.get('/clients/details', isAuthenticate, ClientController.show)
    this.router.put('/clients/:id', isAuthenticate, ClientController.update)
    this.router.delete('/clients/:id', isAuthenticate, ClientController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new ClientRouter()
