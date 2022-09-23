import * as dotenv from 'dotenv'

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env' })
} else {
  dotenv.config({ path: '.env.test' })
}

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

export { PORT, DB_URL }
