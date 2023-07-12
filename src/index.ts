import { configDotenv } from 'dotenv'
import express from 'express'

import morgan from 'morgan'
import router from './routes'
import { preloadDatabase } from './utils/preloadDatabase'

configDotenv()

const app = express()

const PORT = process.env.PORT || 3001

preloadDatabase()

app.use(express.json())

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.options('*', (_, res) => {
  res.sendStatus(200)
})

app.use(morgan('common'))
app.use(router)

app.listen(PORT, () => {
  console.log('Server is running at ', PORT)
})
