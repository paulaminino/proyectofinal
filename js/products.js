// En este archivo no utilizamos el evento "DOMContentLoaded", ya que se colocó el atributo "defer" en la importación del script,
// que nos soluciona el problema de los elementos no cargados del DOM. Más info => https://www.w3schools.com/tags/att_script_defer.asp

const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL que contiene los datos que queremos mostrar

const contenedor = document.getElementById("idcontainer"); // "Traemos" utilizando el DOM el div de id "container" para colocar la información en él

/**
 * Función que recibe por parámetro un array con los datos que se mostrarán en el DOM
 * Los datos se mostrarán dentro del div de id "container" y por cada ítem se está creando un nuevo párrafo donde se
 * imprime el campo "name" y el campo "lastname" separados por un espacio
 */
function showData(dataArray) {
  // El for itera sobre los elementos del array
  for (const item of dataArray) {
    // En la siguiente línea se utilizan "backticks" para armar el String. Más info => https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
    contenedor.innerHTML += `<p> ${item.name} ${item.currency}${item.cost} ${item.description} ${item.soldCount} ${item.image} </p>`; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor
  }
}



// Escribe el código necesario para realizar el fetch al archivo con los datos y mostrar los estudiantes con la función showData
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