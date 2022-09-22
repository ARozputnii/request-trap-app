import RequestService from '../services/RequestService.js'
import { io } from '../../app.js'
import * as fs from 'fs'

class RequestsController {
  async index (req, res) {
    try {
      const page = fs.readFileSync('app/views/requests/index.html', 'utf8')
      const requests = await RequestService.findAll()

      res.send(page.replace('{requests}', JSON.stringify(requests)))
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async show (req, res) {
    try {
      const id = req.params.trap_id
      const page = fs.readFileSync('app/views/requests/show.html', 'utf8')
      const request = await RequestService.findOne(id)

      res.send(page.replace('{request}', JSON.stringify(request)))
    } catch (err) {
      if (err.name === 'CastError') {
        const message = 'Resource not found. Invalid ID'
        return res.status(404).send(message)
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async create (req, res) {
    if (req.params.trap_id === 'favicon.ico') return
    try {
      const requestParams = {
        requestDate: new Date(),
        ip: req.ip,
        method: req.method,
        scheme: req.protocol,
        queryString: req.params.trap_id,
        queryParams: req.query,
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
