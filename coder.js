import {promises as fs} from 'fs'


        
class ProductManager  {
    
    constructor(path){
        this.products = []
        this.path=path
    }
   

   async addProduct(product){
    let ok = true
        // validar tenga todos los campos
        let validadcampos = Object.values(product)
        validadcampos.forEach(element => {
            if (!ok) {
                return;}
               

             ok =  element?? false
             if(!ok) {
                console.log(element +'  No se permiten campos nulos o indefindos')
                return}   

            })

        if (ok){
        // validar code unico
        let validacion_code = product.code
        let encontrado = false
        if (product.id > 0 ){
        this.products.map( (p) =>
        {        if (p.code === validacion_code) {
                    console.log(p.code + '  Codigo Existente')
                    encontrado = true
            }
            
            })
    }
    if (ok && (encontrado===false || product.id === 0 ) )  {

        this.products.push(product)
        console.log(`producto ${product.title} agregado `)

        await  fs.writeFile(this.path,JSON.stringify(this.products))

    }
        
    }
}
     


   async getProducst(){
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return  productos
}

 async getProducstById(id){
    const producto = JSON.parse(await fs.readFile(this.path, 'utf-8'))
     
    const productobuscado = producto.filter(
        p => p.id===id  
    )
     return  productobuscado.length===0?'Not Found':productobuscado
}

async deleteProducstById(id){
    const producto = JSON.parse(await fs.readFile(this.path, 'utf-8'))
     
    const productobuscado = producto.find(p => p.id===id  )   

    if (productobuscado){
    producto.splice(producto.indexOf(productobuscado),1)


    await  fs.writeFile(this.path,JSON.stringify(producto))
    }
     return  !productobuscado?'Not Found':'Producto eliminado'
}



async updateProducstById(id,newObject){
    const producto = JSON.parse(await fs.readFile(this.path, 'utf-8'))
     
    const productobuscado = producto.find(p => p.id===id  )   

    if (productobuscado){
        
     newObject.id = id
    producto.splice(producto.indexOf(productobuscado),1,newObject)


    await  fs.writeFile(this.path,JSON.stringify(producto))
    }
     return  !productobuscado?'Not Found':'Producto actualizado'
}



}

class Product {
    constructor(title,description,price,thumbnail,code,stock){
        this.title=title,
        this.description=description,
        this.price=price,
        this.thumbnail=thumbnail,
        this.code=code,
        this.stock=stock
        this.id = Product.incrementarId()
    }
   
    static incrementarId() {
        this.incrementId? this.incrementId++:this.incrementId = 1
        return this.incrementId
    }
}



const producto1 = new Product(undefined,'Comestible',800,'fotomanzana.jpg','ACB123',151);
const producto2 = new Product('Coca-Cola','Bebible',600,'fotococa.jpg','ADK485',300);
const producto3 = new Product('Aspirina','Salud',500,'fotoaspirina.jpg','JKL620',1200);
const producto4 = new Product('Lavandina','Limpieza',450,'fotolavandina.jpg','ACB123',800);
const producto5 = new Product('Pescado','Comestible',null,'fotopescado.jpg','WER420',80);
const producto6 = new Product('Papas fritas','Snack',700,'papitas.jpg','JKL620',458);

const manejador = new ProductManager('./productos_coder.txt');



await manejador.addProduct(producto1)
await manejador.addProduct(producto2)
await manejador.addProduct(producto3)
await manejador.addProduct(producto4)
await manejador.addProduct(producto5)
await manejador.addProduct(producto6)



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


const producto7 = {title:'Fernet branca',
                   description:'Alcohol',
                   price:3000,
                   thumbnail:'fernetcito.jpg',
                   code: 'FFF999',
                   stock:1200}
    
let respuesta5 = await manejador.updateProducstById(3,producto7)
console.log(respuesta5)



const producto8 = {title:'Pelota',
                   description:'Deportes',
                   price:1600,
                   thumbnail:'Pelota.jpg',
                   code: 'HUG259',
                   stock:83}


let respuesta6 = await manejador.updateProducstById(8,producto8)
console.log(respuesta6)
