document.addEventListener('DOMContentLoaded', () => {
    let carroVacio = true;
    let contenedorTodo  = document.getElementById("productosAComprar");

function CarritoVacio (){
    if (!localStorage.getItem("CantCarrito") || localStorage.getItem("CantCarrito") == "" || localStorage.getItem("CantCarrito") == 0){
        alert("Detectamos que no tenes productos en tu carrito");
    } else {
        carroVacio = false;
    }
}

function MostrarProductosCarro (){

    function showProductosC (item){
        let prod = document.createElement("div");
        prod.className = "producto";
        prod.classList.add ("row");
        prod.classList.add("productoCarrito")
            let dvimg = document.createElement ("div");
            dvimg.className = "col-lg-4";
            let imagen = document.createElement ("img");
            imagen.className = "img";                          /*CLASE QUE SE PUEDEN USAR EN CSS, SE PUEDE AGREGAR MÁS*/
            imagen.src = item.images[0];
            dvimg.appendChild(imagen)
        prod.appendChild(dvimg);

            let textodiv = document.createElement("div"); /* div para todo texto */
            textodiv.className = "col-lg-5";             

                let nombre = document.createElement("div");
                nombre.className = "nombreproducto";
                textodiv.appendChild(nombre);
                nombre.appendChild(document.createTextNode(item.name));

                let titulocosto = document.createElement("div"); /* Texto Precio: -------------------- !!*/
                titulocosto.className = "tituloproducto"
                titulocosto.appendChild(document.createTextNode("Precio:"));
                textodiv.appendChild(titulocosto); 

                let costo = document.createElement("div");
                costo.className = "descripcion";          
                costo.appendChild(document.createTextNode(item.currency + " " + item.cost));
                textodiv.appendChild(costo);


                /*textodiv.innerHTML += `<form action=>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad${item.id}" onchange = "guardarCant(${item.id})" name="cantidad" min="0"placeholder="1">
                <button class="btn" type="button" id="guardarCant">Guardar</button>
                </form>`*/

                let titulocant = document.createElement("div"); /* Texto Cantidad: -------------------- !!*/
                titulocant.className = "descripcion"
                titulocant.appendChild(document.createTextNode("Cantidad:"));
                textodiv.appendChild(titulocant); 

                let carrito = JSON.parse(localStorage.getItem("carrito"));
                let producto = carrito.find(producto => producto.id == item.id);

                let input = document.createElement('input');
                input.type = 'number';
                input.id = 'cantidad' + item.id; // Generar un ID único
                input.placeholder = '1';
                if (localStorage.getItem ("carrito")){
                    input.value = producto.cantidad;}
                textodiv.appendChild(input);
                
                // Asignar el evento onchange
                input.onchange = function() {
                    guardarCant(input.id, item.id);
               };

                let titulosubtotal = document.createElement("div"); /* Texto Subtotal: -------------------- !!*/
                titulosubtotal.className = "tituloproducto"
                titulosubtotal.appendChild(document.createTextNode("Subtotal:"));
                textodiv.appendChild(titulosubtotal); 

                let subtotal = document.createElement("div");
                subtotal.className = "descripcion";
                let cant = parseInt(producto.cantidad);
                let sub = item.cost*cant;
                subtotal.appendChild(document.createTextNode(item.currency + " " + sub));
                textodiv.appendChild(subtotal);
                prod.appendChild(textodiv);



/*INICIO BOTÓN ELIMINAR PRODUCTO DEL CARRITO*/

        let botondiv = document.createElement("div"); /* div para todo texto */
        botondiv.className = "col-lg-2";  
        let botonBorrar = document.createElement("button");
        botonBorrar.id = "botonBorrar";
        botonBorrar.className = "borrarProducto";
        let textoBoton = document.createTextNode("Borrar");
        botonBorrar.appendChild(textoBoton);
        botondiv.appendChild(botonBorrar);
        prod.appendChild(botondiv);

        contenedorTodo.appendChild(prod);

        /*botonBorrar.addEventListener('click', () => borrarProducto (carrito, producto));*/
        botonBorrar.addEventListener('click', function() {
        borrarProducto(carrito, producto.id)});

        /*FIN BOTÓN ELIMINAR PRODUCTO DEL CARRITO*/   
        
        /*modificar el arreglo, Actualizar de forma sincrónico, Actualización en tiempo real, modificar subtotales, cantidades
función tools, se llama en javascript carrito porque cuando se modifican las funciones también se modifica el badge*/
        
        function borrarProducto (arreglo, id) {
            let producto = arreglo.find(producto => producto.id == id);
            console.log(id);
            console.log(producto)
            let nuevoarreglo = arreglo.filter(elemento => elemento != producto);
            console.log(localStorage.getItem("carrito"));
            localStorage.setItem("carrito", JSON.stringify(nuevoarreglo));
            console.log(localStorage.getItem("carrito"));
            contenedorTodo.innerHTML = "";
            MostrarProductosCarro ();
            agregarBadges();
            console.log(nuevoarreglo.length);
            if (nuevoarreglo.length == 0){
                localStorage.setItem("CantCarrito", 0);
            }
        }

    
    function guardarCant (inputID, productoID) {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        let inputCant = document.getElementById(inputID);
        let producto = carrito.find(producto => producto.id == productoID);
        producto.cantidad = inputCant.value
        localStorage.setItem("carrito", JSON.stringify(carrito));
        subtotal.removeChild(subtotal.firstChild);
        subtotal.appendChild(document.createTextNode(item.currency + " " + item.cost*inputCant.value));
        agregarBadges();
    }
    

    }

    function respuesta (response) {
        return response.json();
      }  
      function datos (data) {
        return showProductosC (data);
      }  
      function esError(error){
        console.error ("Ocurrió error", error);
      }  
      function mostrarProductosC (DATA_URL) {
        fetch(DATA_URL)
        .then(respuesta)
        .then(datos)
        .catch(esError);
      }

    if (!carroVacio) {
        let arregloProd = JSON.parse(localStorage.getItem("carrito"));
        for (idProductoCarrito of arregloProd){
            let DATA_URL = `https://japceibal.github.io/emercado-api/products/${idProductoCarrito.id}.json`; 50921
            mostrarProductosC (DATA_URL);
        }
        

        
    }
}


CarritoVacio ();
MostrarProductosCarro ();

function agregarBadges() {
    let arreglo = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = arreglo.reduce((total, producto) => total + parseInt(producto.cantidad), 0);
    document.getElementById("cuentacarrito").innerText = total;
  
  }


});


