import express from 'express'
import router from './config/router.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { PORT } from './config/dotenv.js'
import './config/database.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = createServer(app)
export const io = new Server(server, {})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(router)

server.listen(PORT, err => {
  if (err) {
    throw err
  } else {
    console.log(`Server running on port: ${PORT}; 
        --- Running on ${process.env.NODE_ENV} environment;
        --- Press Ctrl+C to quit.`)
  }
})

export default server
