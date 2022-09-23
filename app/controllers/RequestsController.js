import RequestService from '../services/RequestService.js'
import { io } from '../../app.js'
import * as fs from 'fs'

class RequestsController {
  async index (req, res) {
    try {
      const page = fs.readFileSync('app/views/requests/requests.html', 'utf8')
      const requests = await RequestService.findAll()

      res.status(200).send(page.replace('{requests}', JSON.stringify(requests)))
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async show (req, res) {
    try {
      const page = fs.readFileSync('app/views/requests/requests.html', 'utf8')
      const trap_id = req.params.trap_id
      const requests = await RequestService.findByParams(trap_id)

      res.status(200).send(page.replace('{requests}', JSON.stringify(requests)))
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  async create (req, res, next) {
    if (req.params.trap_id === 'favicon.ico' ||
      req.params[0] === 'requests' ||
      req.params[0] === 'js/requests/index.js' ||
      req.params[0] === 'socket.io/socket.io.js'
    ) {
      return next()
    }
    try {
      const requestParams = {
        requestDate: new Date(),
        ip: req.ip,
        method: req.method,
        scheme: req.protocol,
        queryString: req.url,
        queryParams: req.params.trap_id,
        headers: req.headers,
        cookies: req.headers.cookie
      }

      const request = await RequestService.create(requestParams)

      io.emit('new-request', request)

      res.status(201).json(request)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new RequestsController()
