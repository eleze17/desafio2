import { Router } from 'express'
import { Cart, CartManager } from '../controllers/coder.js'

const rutaCarts = Router()

const manejador = new CartManager('../primera_entrega/src/carritos.json')

rutaCarts.get('/', async (req, res) => {
  const carros = await manejador.getCarts()
  res.send(carros)
})

rutaCarts.get('/:id', async (req, res) => {
  const carro = await manejador.getCartsById(parseInt(req.params.id))
  res.send(carro)
})
rutaCarts.post('/', async (req, res) => {
  const { products } = req.body // en el body viene un obj con prop products que es un array {"products": [{"product":1},{"product":3}   }
  const carrito = new Cart()
  carrito.products = products.slice()
  const respuesta = await manejador.addCart(carrito)
  res.send(respuesta)
})
rutaCarts.post('/:id/product/:pid', async (req, res) => {
  const { id, pid } = req.params
  await manejador.addProductToCart(parseInt(id), parseInt(pid))
  res.send(`Se agrego al carro id : ${id} el producto id : ${pid} `)
})

export default rutaCarts
