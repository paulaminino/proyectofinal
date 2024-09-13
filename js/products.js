let DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL que contiene los datos que queremos mostrar

const contenedor  = document.getElementById("c_autos");


function showData (dataArray) {
    for (const item of dataArray) {
        let prod = document.createElement("div");
        prod.className = "producto";
        prod.classList.add ("row");
        prod.addEventListener('click', () => setProdID(item.id));
            let imagen = document.createElement ("img");
            imagen.className = "img";
            imagen.classList.add ("col-lg-4");
            imagen.src = item.image;
            prod.appendChild(imagen);
            let textodiv = document.createElement("div");
            textodiv.classList.add ("col-lg-7");
                let nombre = document.createElement("div");
                nombre.className = "nombreproducto";
                nombre.appendChild(document.createTextNode(item.name));
                textodiv.appendChild(nombre);
                let descrip = document.createElement("div");
                descrip.className = "descripcion";
                descrip.appendChild(document.createTextNode(item.description));
                textodiv.appendChild(descrip);
                let costo = document.createElement("div");
                costo.className = "precio";
                costo.appendChild(document.createTextNode(item.currency + " " + item.cost));
                textodiv.appendChild(costo);
                let cantVend = document.createElement("div");
                cantVend.className = "nota";
                cantVend.appendChild(document.createTextNode(item.soldCount + " cantidad de vendidos"));
                textodiv.appendChild(cantVend);  
            prod.appendChild(textodiv);
        contenedor.appendChild(prod);
        let linea = document.createElement("hr");
        linea.className = "lineaH";
        contenedor.appendChild(linea);
    }

}

function respuesta (response) {
  return response.json();
}

function datos (DATA_URL) {
  return showData (DATA_URL.products);
}

function esError(error){
  console.error ("Ocurrió error", error);
}

function mostrarProductos () {
  fetch(DATA_URL)
  .then(respuesta)
  .then(datos)
  .catch(esError);
}

mostrarProductos();

// Desafiate busqueda ____________________________________ 

// Selecciona el campo de texto y el botón de búsqueda
const buscador = document.getElementById('buscador'); //Llamar al elemento id "buscador" del imput type en products.html
const botonBuscar = document.getElementById('buscar');
let lineas = document.getElementsByClassName ('lineaH');

function sacarLineas (padre, hijo) {
  for (let i of hijo){
    padre.removeChild (i);
  }
}
function ocultarLineas () {
  sacarLineas (contenedor, lineas);
}


function realizarBusqueda() { // Función para realizar la búsqueda
    const textoBusqueda = buscador.value.toLowerCase(); // Obtiene el texto del campo de búsqueda
    const productos = document.querySelectorAll('.producto'); // Selecciona todos los productos del array
    ocultarLineas ();
    // Filtrar productos según el texto ingresado
    productos.forEach(function(producto) {
        const titulo = producto.querySelector('.nombreproducto').textContent.toLowerCase();
        const descripcion = producto.querySelector('.descripcion').textContent.toLowerCase();
        
        // Mostrar u ocultar el producto, según si coincide con el título o la descripción
        if (titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda)) {
            producto.style.display = 'block';  // Mostrar producto
        } else {
            producto.style.display = 'none';  // Ocultar producto
        }
    });
  
}

// Evento cuando el usuario escribe - no necesario
buscador.addEventListener('input', realizarBusqueda);

// Evento para búsqueda cuando el usuario hace clic en el botón
botonBuscar.addEventListener('click', realizarBusqueda);

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
  let nombre = localStorage.getItem("usuario");
  document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/


/*INICIO Guarda el ID del producto seleccionado en la memoria local y redirige a la página de dicho producto*/
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}
/*FIN Guarda el ID del producto seleccionado en la memoria local y redirige a la página de dicho producto*/

