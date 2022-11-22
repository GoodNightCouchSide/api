import express from 'express'
import EventRoutes from './EventRoute'
import DocsRoutes from './Docs'

const router = express.Router()

const defaultRoutes = [
  { path: '/event', route: EventRoutes },
  { path: '/docs', route: DocsRoutes }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

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
