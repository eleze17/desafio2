import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import rutaProduct from './routes/products.route.js'
import rutaCarts from './routes/rutaCarts.route.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/statics', express.static(path.join(__dirname, 'public')))

app.use('/api/products', rutaProduct)

app.use('/api/carts', rutaCarts)

app.listen(8080)
