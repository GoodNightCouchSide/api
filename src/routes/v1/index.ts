import express, { IRouter } from 'express'
import EventRoutes from './EventRoute'
import GenreRoutes from './GenreRoute'
import DocsRoutes from './Docs'
import SeedingRoutes from './SeedingRoute'
import { config } from '../../config/config'

const router = express.Router()

interface IRoute {
  path: string
  route: IRouter
}

const defaultRoutes = [
  { path: '/event', route: EventRoutes },
  { path: '/docs', route: DocsRoutes },
  { path: '/genre', route: GenreRoutes }
]

const notForeProduction = [{ path: '/seeding', route: SeedingRoutes }]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

if (config.nodeEnv !== 'production') {
  notForeProduction.forEach((route: IRoute) => {
    router.use(route.path, route.route)
  })
}

/**
 * @swagger
 * /ping:
 *  get:
 *    tags:
 *      - Healtcheck
 *    description: Responds pong if the app is up and running
 *    responses:
 *      200:
 *        description: Retrun pong
 */
router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }))

export = router
