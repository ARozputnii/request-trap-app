import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { PORT, DB_URL } from './config/dotenv.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = createServer(app)
export const io = new Server(server, {})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(router)

async function startApp () {
  try {
    await mongoose.connect(DB_URL)
    server.listen(PORT, () => { console.log(`App listening on port ${PORT}\n Press Ctrl+C to quit.`) })
  } catch (e) {
    console.error(e)
  }
}

startApp()
