import RequestService from '../services/RequestService.js'

class RequestsController {
  async index (req, res) {
    try {
      const requests = await RequestService.findAll()
      res.status(200).json(requests)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async show (req, res) {
    try {
      const id = req.params.trap_id
      const request = await RequestService.findOne(id)
      res.status(200).json(request)
    } catch (err) {
      if (err.name === 'CastError') {
        const message = 'Resource not found. Invalid ID'
        return res.status(404).send(message)
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async create (req, res) {
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
      res.status(201).json(request)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new RequestsController()
