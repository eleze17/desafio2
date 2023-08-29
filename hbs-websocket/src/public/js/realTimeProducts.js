const socket = io()

const botonProds = document.getElementById('mostrarProd')

botonProds.addEventListener('click', () => {
    socket.emit('consultaProd')      
})

socket.on("respuestaProd", (productos) => {
   const bloque = productos.map(p =>{
        return(
            `<tr>
            <td>${p.title}</td>
            <td>${p.description}</td>
            <td>${p.price}</td>
            <td>${p.thumbnail} </td>
            <td>${p.code}</td>
            <td>${p.stock} </td>
            <td>${p.category} </td>
            <th scope="row">${p.id} </th>
            </tr>`
        )
})
const bloquelimpio = bloque.join()
const bloqueainsertar = document.createElement('TBODY')
bloqueainsertar.innerHTML= bloquelimpio
//bloqueainsertar.appendChild(bloquelimpio)  
const cuerpotable = document.getElementById('detalle')
console.log(bloqueainsertar)
cuerpotable.innerHTML= bloqueainsertar

})