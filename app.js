import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import router from './router.js'

dotenv.config()

const app = express()
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-test.5s1fa.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT

app.use(express.json())
app.use(router)

async function startApp () {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => { console.log(`App listening on port ${PORT}\n Press Ctrl+C to quit.`) })
  } catch (e) {
    console.error(e)
  }
}

startApp()
