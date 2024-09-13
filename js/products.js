let DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL que contiene los datos que queremos mostrar

let contenedor  = document.getElementById("c_autos");



function showData (dataArray) {
 
     for (const item of dataArray) {
        let prod = document.createElement("div");
        prod.className = "producto";
        prod.classList.add ("row");
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

let orden = '';

function empty (padre) {
  while (padre.firstChild){
    padre.firstChild.remove ();
  }
}
function ocultarActual () {
  empty (contenedor);
}

function ordena (data){
  if (orden == 'asc'){
    data.products.sort((a, b) => a.cost - b.cost);
    console.log (data.products);
  } else if (orden == 'desc'){
    data.products.sort((a, b) => b.cost - a.cost);
    console.log (data.products);
  }
  ocultarActual ();
  return (showData(data.products));
}
function ordenasc () {
 orden = 'asc';
 ordenarProductos ();
} 

function ordendesc () {
 orden = 'desc';
 ordenarProductos();
}

function ordenarProductos () {
  fetch(DATA_URL)
  .then(respuesta)
  .then(ordena)
  .catch(esError);
}

//Botón para ordenar asc:
document.getElementById("sortAsc").addEventListener("click", ordenasc);
// Boton para ordenar desc:
document.getElementById("sortDesc").addEventListener("click", ordendesc);





mostrarProductos();


/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
  let nombre = localStorage.getItem("usuario");
  document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/