import express from 'express'
import { logger } from './middlewares/logger.js'
import { ordersRouter } from './routes/orders.routes.js'
import { productsRouter } from './routes/products.routes.js'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(logger)

app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'API de ecommerce rodando.' })
})

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`)
})
