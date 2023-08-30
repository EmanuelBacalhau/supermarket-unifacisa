import express, { Application } from "express";

class App {
  private app: Application

  constructor() {
    this.app = express()
  }

  public listen() {
    const PORT = Number(process.env.PORT) || 3333
    this.app.listen(PORT, () => {
      console.log("Servr started!🚀");
    })
  }
}

export default new App();