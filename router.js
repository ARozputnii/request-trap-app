import { Router } from 'express'
import RequestsController from './app/controllers/RequestsController.js'

const router = new Router()

router.get('/', RequestsController.index)
router.get('/:trap_id/requests', RequestsController.show)
router.all('/:trap_id', RequestsController.create)

export default router
