import express  from 'express'
import {ProductManager,Product} from './coder.js'
const app = express()




const manejador = new ProductManager('./productos_coder.txt');

const producto1 = new Product(undefined,'Comestible',800,'fotomanzana.jpg','ACB123',151);
const producto2 = new Product('Coca-Cola','Bebible',600,'fotococa.jpg','ADK485',300);
const producto3 = new Product('Aspirina','Salud',500,'fotoaspirina.jpg','JKL620',1200);
const producto4 = new Product('Lavandina','Limpieza',450,'fotolavandina.jpg','ACB123',800);
const producto5 = new Product('Pescado','Comestible',null,'fotopescado.jpg','WER420',80);
const producto6 = new Product('Papas fritas','Snack',700,'papitas.jpg','JKL620',458);



await manejador.addProduct(producto1)
await manejador.addProduct(producto2)
await manejador.addProduct(producto3)
await manejador.addProduct(producto4)
await manejador.addProduct(producto5)
await manejador.addProduct(producto6)


/*
let respuesta = await manejador.getProducst()
console.log(respuesta)

let respuesta1 = await manejador.getProducstById(2)
console.log(respuesta1)
let respuesta2 = await manejador.getProducstById(10)
console.log(respuesta2)


let respuesta3 = await manejador.deleteProducstById(2)
console.log(respuesta3)


let respuesta4 = await manejador.deleteProducstById(50)
console.log(respuesta4)
*/

const producto7 = {title:'Fernet branca',
                   description:'Alcohol',
                   price:3000,
                   thumbnail:'fernetcito.jpg',
                   code: 'FFF999',
                   stock:1200}
    
/*let respuesta5 = await manejador.updateProducstById(3,producto7)
console.log(respuesta5)
*/


const producto8 = {title:'Pelota',
                   description:'Deportes',
                   price:1600,
                   thumbnail:'Pelota.jpg',
                   code: 'HUG259',
                   stock:83}


/*let respuesta6 = await manejador.updateProducstById(8,producto8)
console.log(respuesta6)*/

app.get('/products', async (req, res) => {
  let respuesta = await manejador.getProducst()
  if (req.query.limit){
    respuesta = respuesta.slice(0,parseInt(req.query.limit)  )

  }


  res.send(respuesta)
})



app.get('/products/:pid', async (req, res) => {
  let {pid}= req.params
  let respuesta1 = await manejador.getProducstById(parseInt(pid))
  res.send(respuesta1)
})

app.listen(3000)