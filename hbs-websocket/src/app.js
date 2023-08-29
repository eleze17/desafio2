import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import path from 'path'
import { Server } from 'socket.io';
import {promises as fs} from 'fs'
import rutaProduct from './routes/products.route.js';

const PORT = 4000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static( path.join(__dirname,'public')))
app.engine('handlebars',handlebars.engine())
app.set('views',path.join(__dirname ,'views'))
app.set('view engine','handlebars')


app.get('/',async(req,res)=>{
const productos = JSON.parse(await fs.readFile(path.join(__dirname , 'productos.json'), 'utf-8')) 
res.render('home', {
    css: "home.css",
    title: "Productos Estaticos",
    js: "home.js",
    productos: productos

})
})

app.get('/realtimeproducts',async(req,res)=>{
    res.render('realTimePRoducts', {
        css: "realTimeProducts.css",
        title: "Productos en tiempo real",
        js: "realTimeProducts.js",
        })
})


app.use('/api/products', rutaProduct)

const Serverexp = app.listen(PORT,()=>console.log('Conectado'))
const io = new Server(Serverexp)


io.on('connection', (socket) => {
    console.log("Socket.io conectado")
    socket.on('consultaProd',async () => {
    const productos = JSON.parse(await fs.readFile(path.join(__dirname , 'productos.json'), 'utf-8')) 
    socket.emit('respuestaProd', productos)    
    })

})
