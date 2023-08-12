import {promises as fs} from 'fs'


        
 export class ProductManager  {
    
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

export class Product {
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





