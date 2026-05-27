import express from 'express'
import { loggerMiddleware } from './middlewares/logger.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import { authRouter } from './routes/auth.routes.js'
import { ordersRouter } from './routes/orders.routes.js'
import { categoryRouter } from './routes/category.routes.js'
import { productsRouter } from './routes/products.routes.js'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(loggerMiddleware)

app.use('/auth', authRouter)
app.use('/category', categoryRouter)
app.use('/categories', categoryRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'API de ecommerce rodando.' })
})

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`)
})
