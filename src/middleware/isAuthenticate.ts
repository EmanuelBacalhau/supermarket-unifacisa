import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  id: string
}

export function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    return res.status(401).end()
  }

  const [, token] = bearerToken.split(' ')

  const JWT_SECRET = process.env.JWT_SECRET as string

  try {
    const { id } = verify(token, JWT_SECRET) as Payload

    req.userId = id

    return next()
  } catch (error) {
    return res.status(401).end()
  }
}
