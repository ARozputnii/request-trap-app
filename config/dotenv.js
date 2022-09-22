import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-test.5s1fa.mongodb.net/?retryWrites=true&w=majority`

export { PORT, DB_URL }
