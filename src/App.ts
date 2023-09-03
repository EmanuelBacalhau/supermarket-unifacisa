import express, { Application, NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { AppError } from './errors/AppError'
import { ZodError } from 'zod'
import ClientRouter from './routes/ClientRouter'
import CategoryRouter from './routes/CategoryRouter'
import ProductRouter from './routes/ProductRouter'
import OrderRouter from './routes/OrderRouter'
import EmployeeRouter from './routes/EmployeeRouter'
import PromotionRouter from './routes/PromotionRouter'
import PromotionClientRouter from './routes/PromotionClientRouter'

class App {
  private app: Application

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.setupRouter()
    this.app.use(this.errorHandling)
  }

  private setupRouter() {
    this.app.use('/api', [
      EmployeeRouter.getRouter,
      ClientRouter.getRouter,
      CategoryRouter.getRouter,
      ProductRouter.getRouter,
      OrderRouter.getRouter,
      PromotionRouter.getRouter,
      PromotionClientRouter.getRouter,
    ])
  }

  public listen() {
    const PORT = Number(process.env.PORT) || 3333
    this.app.listen(PORT, () => {
      console.log('Server started!🚀')
    })
  }

  private async errorHandling(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      })
    }

    if (err instanceof ZodError) {
      return res.status(422).json({
        status: 'error',
        message: err.errors,
      })
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}

export default new App()
