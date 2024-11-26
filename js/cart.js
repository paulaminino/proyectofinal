document.addEventListener('DOMContentLoaded', () => {
    let carroVacio = true;
    let contenedorTodo  = document.getElementById("productosAComprar");
    let contenedorCompra = document.getElementById("compra")

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
                input.min = 1;
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
            let nuevoarreglo = arreglo.filter(elemento => elemento != producto);
            console.log(localStorage.getItem("carrito"));
            localStorage.setItem("carrito", JSON.stringify(nuevoarreglo));
            console.log(localStorage.getItem("carrito"));
            contenedorTodo.innerHTML = "";
            MostrarProductosCarro ();
            agregarBadges();
            actualizarCostos ();
            if (nuevoarreglo.length == 0){
                localStorage.setItem("CantCarrito", 0);
                contenedorCompra.innerHTML= "";
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
        actualizarCostos ();
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




 // actualiza costo total según subtotal y tipo de envío
function actualizarCostos() {
    const subtotal = calcularSubtotal(); // calcula subtotal de todos los productos en el carrito
    const costoEnvio = calcularCostoEnvio(subtotal); // calcula costo de envío según opción elegida
    const total = subtotal + costoEnvio;
  
    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2); // solo dos decimales
    document.getElementById("costo-envio").textContent = "$" + costoEnvio.toFixed(2);
    document.getElementById("costo-total").textContent = "$" + total.toFixed(2);
}
  
if (!carroVacio){
function calcularSubtotal() {
    const productos = JSON.parse(localStorage.getItem("carrito")) || [];
    return productos.reduce((total, producto) => total + ((producto.cantidad || 1) * producto.cost), 0);
}

  
function calcularCostoEnvio(subtotal) {
    const tipoEnvio = document.querySelector('input[name="tipo-envio"]:checked').value;
    let porcentaje = 0;
  
    if (tipoEnvio === "premium") porcentaje = 0.15;
    else if (tipoEnvio === "express") porcentaje = 0.07;
    else if (tipoEnvio === "standard") porcentaje = 0.05;
  
    return subtotal * porcentaje;
}
  
  document.querySelectorAll('input[name="tipo-envio"]').forEach(input => {
    input.addEventListener('change', actualizarCostos);
});

actualizarCostos ();

const departamento = document.getElementById('departamento');
const localidad = document.getElementById('localidad');
const calle = document.getElementById('calle');
const num = document.getElementById('numero-puerta');
const esquina = document.getElementById('esquina');
const btnCompra = document.getElementById('finalizar-compra');


// Los campos asociados a la dirección no podrán estar vacíos
// "Departamento", "Localidad", "Calle", "Número" y "Esquina".
function direccion() { 
    let isValid = true; 
    
    if (departamento.value === '') { 
    departamento.setCustomValidity('Debe ingresar un departamento'); 
    departamento.reportValidity();
    isValid = false; 
} else { 
    departamento.setCustomValidity(''); 
} 

if (localidad.value === '') { 
    localidad.setCustomValidity('Debe ingresar una localidad');
    localidad.reportValidity(); 
    isValid = false; 
} else { 
    localidad.setCustomValidity(''); 
} 

if (calle.value === '') { 
    calle.setCustomValidity('Debe ingresar una calle'); 
    calle.reportValidity();
    isValid = false; 
} else { 
    calle.setCustomValidity(''); 
} 
if (num.value === '') { 
    num.setCustomValidity('Debe ingresar el número de puerta');
    num.reportValidity();
    isValid = false; 
} else { 
    num.setCustomValidity('');
 } 
 if (esquina.value === '') { 
    esquina.setCustomValidity('Debe ingresar el nombre de la calle de la esquina'); 
    esquina.reportValidity();
    isValid = false; 
} else { 
    esquina.setCustomValidity(''); 
} 
return isValid;    
}

// Deberá estar seleccionada la forma de envío.
function formenvio (){
    if (!document.querySelector('input[name="tipo-envio"]:checked')) {
        alert ('Debe seleccionar una forma de envío');
        return false;
    }
    return true;
}

// Los campos para la forma de pago seleccionada no podrán estar vacíos.
// Deberá haberse seleccionado una forma de pago.
function formadepago (){
    if ( !document.querySelector('input[name="forma-pago"]:checked')){
        alert ('Debe seleccionar una forma de pago');
        return false;
    }
    return true;
}

// La cantidad para cada producto deberá estar definida y ser mayor a 0.
function cantidadProd (){
    const cantidades = document.querySelectorAll('input[id^="cantidad"]');
    for (const cantidad of cantidades) {
        if (cantidad.value <= 0 || isNaN(cantidad.value)) {
            alert('La cantidad del producto está en 0');
            return false;
        }
        
    }
    return true;
}

function validacion (){
    if (direccion () && formadepago() && formenvio () && cantidadProd()){
        alert ('Su compra se realizó exitosamente');
        localStorage.removeItem("carrito");
        localStorage.setItem("CantCarrito", 0);
        contenedorTodo.innerHTML = "";
        contenedorCompra.innerHTML= "";
        agregarBadges();
        actualizarCostos ();
        return false;
    }
    return true;
}

btnCompra.addEventListener('click', validacion);
};
});


