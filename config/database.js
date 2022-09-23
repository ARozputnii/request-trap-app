import mongoose from 'mongoose'
import { DB_URL } from './dotenv.js'

try {
  mongoose.connect(DB_URL)
} catch (err) {
  mongoose.createConnection(DB_URL)
}

mongoose.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
  throw e
})

mongoose.connection.once('close', () => console.log('MongoDB connection closed')).on('error', e => {
  throw e
})
