/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
    let nombre = localStorage.getItem("usuario");
    document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/

/*INICIO leectura JSON*/
let categoria = localStorage.getItem("catID");
const DATA_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`; // URL que contiene los datos que queremos mostrar


const contenedorTodo  = document.getElementById("div_contenedorTodo"); /*YA LO AGREGUÉ EN HTML*/

function showData (item) {
    let prod = document.createElement("div");
    prod.className = "producto";                    /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS CON prod.classList.add ("nuevaClase"); - Para agregar ID usar prod.id = "nuevoID"; (usarlo solo en elementos únicos)*/
        let imagen = document.createElement ("img");
        imagen.className = "img";                       /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
        imagen.src = item.image;
        prod.appendChild(imagen);
        let textodiv = document.createElement("div");   /* div para todo texto, no tiene porqué ser así*/
        textodiv.className = "img";                     /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
            let nombre = document.createElement("div");
            nombre.className = "nombreproducto";        /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
            nombre.appendChild(document.createTextNode(item.name));
                textodiv.appendChild(nombre);
                let descrip = document.createElement("div");
                descrip.className = "descripcion";      /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
                descrip.appendChild(document.createTextNode(item.description));
                textodiv.appendChild(descrip);          
                let costo = document.createElement("div");
                costo.className = "precio";             /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
                costo.appendChild(document.createTextNode(item.currency + " " + item.cost));
                textodiv.appendChild(costo);
                let cantVend = document.createElement("div");
                cantVend.className = "nota";            /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS*/
                cantVend.appendChild(document.createTextNode(item.soldCount + " cantidad de vendidos"));
                textodiv.appendChild(cantVend);  
            prod.appendChild(textodiv);
        contenedorTodo.appendChild(prod);
}

function prodSeleccionado (dataArray) {
    let id = localStorage.getItem("prodID");
    for (const item of dataArray) {
        if (item.id == id){
            return item;
        }
}
}

function respuesta (response) {
    return response.json();
  }
  
  function datos (data) {
    return showData (prodSeleccionado (data.products));
  }
  
  function esError(error){
    console.error ("Ocurrió error", error);
  }
  
  function mostrarProducto () {
    fetch(DATA_URL)
    .then(respuesta)
    .then(datos)
    .catch(esError);
  }
  
  mostrarProducto();