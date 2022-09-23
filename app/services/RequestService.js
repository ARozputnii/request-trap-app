import Request from '../models/Request.js'

class RequestService {
  async findAll () {
    return await Request.find()
  }

  async findByParams (params) {
    return await Request.find({ query_params: params })
  }

  async create (params) {
    return await Request.create({
      request_date: params.requestDate,
      remote_ip: params.ip,
      request_method: params.method,
      scheme: params.scheme,
      query_string: params.queryString,
      query_params: params.queryParams,
      headers: params.headers,
      cookies: params.cookies
    })
  }
}

export default new RequestService()
