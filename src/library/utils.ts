import { NextFunction, Request, Response } from 'express'

export const apiRules = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (object: Record<string, any>, keys: Array<string>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keys.reduce((obj: Record<string, any>, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}
