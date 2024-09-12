const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL que contiene los datos que queremos mostrar

const contenedor  = document.getElementById("c_autos");


function showData (dataArray) {
  let arreglo = dataArray
  if (document.getElementById("rangeFilterCount").addEventListener("click",filtrando)) {
    function filtrando () {
    let minprecio = document.getElementById("rangeFilterCountMin").value; // Definiendo una variable que tiene adentro el rango menor.
    let maxprecio = document.getElementById("rangeFilterCountMax").value; // Definiendo una variable que tiene adentro el rango mayor.
   return arreglo.filter(products => products.cost >= minprecio && products.cost <= maxprecio);
    }
  } else {
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
    

   

}

function respuesta (response) {
  return response.json();
}

function datos (DATA_URL) {
  console.log(DATA_URL);
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


 //Filtrando por rango menor y mayor.

 //DATA_URL.products.filter(function(x){ return x.cost >= 14000 && x.cost <= 35000});



//function ordenar (){
//  const ordenarRelevancia = (products, ascendente = true) => {
//  return products.sort((a, b) => ascendente ? a.soldCount - b.soldCount : b.soldCount - a.soldCount)};

//} 
// Botón para filtrar:


//Botón para ordenar:
//document.getElementById("sortAsc").addEventListener("click", ordenar = true);
//document.getElementById("sortDesc").addEventListener("click", ordenar = false);

// Botón para limpiar:
document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
});



mostrarProductos();


/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
  let nombre = localStorage.getItem("usuario");
  document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/