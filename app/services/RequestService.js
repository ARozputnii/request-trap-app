import Request from '../models/Request.js'

class RequestService {
  async findAll () {
    return await Request.find()
  }

  async findOne (id) {
    const request = await Request.findById(id)

    return request
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
