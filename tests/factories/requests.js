import { factory } from 'factory-girl'

import Request from '../../app/models/Request.js'
import { faker } from '@faker-js/faker'

factory.define('Request', Request, {
  request_date: new Date(),
  remote_ip: faker.internet.ip(),
  request_method: faker.internet.httpMethod(),
  scheme: faker.internet.protocol(),
  query_string: faker.internet.domainSuffix(),
  query_params: faker.internet.domainWord(),
  cookies: faker.lorem.sentence(5),
  headers: {}
})

export default factory
