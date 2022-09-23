import { Router } from 'express'
import RequestsController from '../app/controllers/RequestsController.js'

const router = new Router()

router.get('/', RequestsController.index)
router.all('/:trap_id/*?', RequestsController.create)
router.all('/:trap_id', RequestsController.create)
router.get('/:trap_id/requests', RequestsController.show)

export default router
