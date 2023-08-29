import { Router } from 'express'
import { ProductManager, Product } from '../controllers/coder.js'

const manejador = new ProductManager('../hbs-websocket/src/productos.json')

/*
const producto1 = new Product(undefined, 'Comestible', 800, 'fotomanzana.jpg', 'ACB123', 151)
const producto2 = new Product('Coca-Cola', 'Bebible', 600, 'fotococa.jpg', 'ADK485', 300)
const producto3 = new Product('Aspirina', 'Salud', 500, 'fotoaspirina.jpg', 'JKL620', 1200)
const producto4 = new Product('Lavandina', 'Limpieza', 450, 'fotolavandina.jpg', 'ACB123', 800)
const producto5 = new Product('Pescado', 'Comestible', null, 'fotopescado.jpg', 'WER420', 80)
const producto6 = new Product('Papas fritas', 'Snack', 700, 'papitas.jpg', 'JKL620', 458)

await manejador.addProduct(producto1)
await manejador.addProduct(producto2)
await manejador.addProduct(producto3)
await manejador.addProduct(producto4)
await manejador.addProduct(producto5)
await manejador.addProduct(producto6)
*/
const rutaProduct = Router()

rutaProduct.get('/', async (req, res) => {
  let respuesta = await manejador.getProducst()
  if (req.query.limit) {
    respuesta = respuesta.slice(0, parseInt(req.query.limit))
  }

  res.send(respuesta)
})

rutaProduct.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const respuesta1 = await manejador.getProducstById(parseInt(pid))
  res.send(respuesta1)
})

rutaProduct.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, stock, status, category } = req.body
  const producPost = new Product(title, description, price, thumbnail, code, stock, status, category)
  const respPost = await manejador.addProduct(producPost)
  res.send(respPost)
})

rutaProduct.put('/:pid', async (req, res) => {
  const { title, description, price, thumbnail, code, stock, status, category } = req.body
  const { pid } = req.params
  const producPut = await manejador.updateProducstById(parseInt(pid), { title, description, price, thumbnail, code, stock, status, category })
  res.send(producPut)
})

rutaProduct.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const producDelete = await manejador.deleteProducstById(parseInt(pid))
  res.send(producDelete)
})
export default rutaProduct
