categoria = localStorage.getItem("catID");
/*DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`; // URL que contiene los datos que queremos mostrar
*/
DATA_URL = `http://localhost:3000/categoriesProd/${categoria}`
contenedor  = document.getElementById("c_producto");

let minprecio = document.getElementById("rangeFilterCountMin").value; // Definiendo una variable que tiene adentro el rango menor.
let maxprecio = document.getElementById("rangeFilterCountMax").value; // Definiendo una variable que tiene adentro el rango mayor.
let activacionFiltro = false;

function Filtrar () {
activacionFiltro = true;
minprecio = document.getElementById("rangeFilterCountMin").value; // Definiendo una variable que tiene adentro el rango menor.
maxprecio = document.getElementById("rangeFilterCountMax").value; // Definiendo una variable que tiene adentro el rango mayor.


  ocultarActual ();
  
  mostrarFiltrado ();
  
}

function empty (padre) {
  while (padre.firstChild){
    padre.firstChild.remove ();
  }
}
function ocultarActual () {
  empty (contenedor);
  
}

function mostrarFiltrado () {
  
  Mostrar();

  



function showData (dataArray) {
  

  function filtro(x){
     return x.cost >= minprecio && x.cost <= maxprecio
    }

  function filtrarArreglo (arreglo) {  
    return arreglo.filter(filtro);
  }
  let arreglo = dataArray
if (activacionFiltro){
  arreglo = filtrarArreglo(dataArray);
}
  
     for (let item of arreglo) {
      
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

function Mostrar () {
  fetch(DATA_URL)
  .then(respuesta)
  .then(datos)
  .catch(esError);
}
}

// Botón para limpiar:
function desfiltrar (){
  minprecio = '';
  maxprecio = '';
  activacionFiltro = false;
  ocultarActual ();
  mostrarFiltrado ();
  
}

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
  desfiltrar ();
});

let botonFiltro = document.getElementById("rangeFilterCount")
botonFiltro.addEventListener("click",Filtrar);
