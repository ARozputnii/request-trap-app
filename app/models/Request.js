import mongoose from 'mongoose'

const Request = new mongoose.Schema({
  request_date: { type: Date, required: true },
  remote_ip: { type: String, required: true },
  request_method: { type: String, required: true },
  scheme: { type: String, required: true },
  query_string: { type: Object },
  query_params: { type: Object },
  cookies: { type: String },
  headers: { type: Object, required: true }
})

export default mongoose.model('Request', Request)
