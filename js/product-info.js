/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
  let nombre = localStorage.getItem("usuario");
  document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/

/*INICIO leectura JSON*/
let ID_PROD = localStorage.getItem("prodID");
const DATA_URL = `https://japceibal.github.io/emercado-api/products/${ID_PROD}.json`; // URL que contiene los datos que queremos mostrar
const contenedorTodo  = document.getElementById("div_contenedorTodo"); /*YA LO AGREGUÉ EN HTML*/

function showData (item) {
  let prod = document.createElement("div");
  prod.className = "productocatego";   /*CLASE QUE SE PUEDEN USAR EN HTML, SE PUEDE AGREGAR MÁS CON prod.classList.add ("nuevaClase"); - Para agregar ID usar prod.id = "nuevoID"; (usarlo solo en elementos únicos)*/
      let textodiv = document.createElement("div"); /* div para todo texto */
      textodiv.className = "estructuradiv";    

              let nombre = document.createElement("div");
              nombre.className = "nombreproductos";
              textodiv.appendChild(nombre);
              nombre.appendChild(document.createTextNode(item.name));

              let titulocosto = document.createElement("div"); /* Texto Precio: -------------------- !!*/
              titulocosto.className = "tituloproducto"
              titulocosto.appendChild(document.createTextNode("Precio:"));
              textodiv.appendChild(titulocosto); 

              let costo = document.createElement("div");
              costo.className = "precio";            
              costo.appendChild(document.createTextNode(item.currency + " " + item.cost));
              textodiv.appendChild(costo);

              let titulodescrip = document.createElement("div"); /* Texto Descripción: -------------------- !!*/
              titulodescrip.className = "tituloproducto"
              titulodescrip.appendChild(document.createTextNode("Descripción:"));
              textodiv.appendChild(titulodescrip); 
              
              let descrip = document.createElement("div");
              descrip.className = "descripcion";     
              descrip.appendChild(document.createTextNode(item.description));
              textodiv.appendChild(descrip);

              let titulocatego = document.createElement("div"); /* Texto Categoría: -------------------- !!*/
              titulocatego.className = "tituloproducto"
              titulocatego.appendChild(document.createTextNode("Categoría:"));
              textodiv.appendChild(titulocatego); 
              
              let catego = document.createElement("div"); /* Categoría -------------------- !!*/
              catego.className = "catego";
              catego.appendChild(document.createTextNode(item.category));
              textodiv.appendChild(catego);  
              
              let titulonota = document.createElement("div"); /* Texto Cantidad Vendidos: -------------------- !!*/
              titulonota.className = "tituloproducto"
              titulonota.appendChild(document.createTextNode("Cantidad de vendidos:"));
              textodiv.appendChild(titulonota); 

              let cantVend = document.createElement("div");
              cantVend.className = "nota";            
              cantVend.appendChild(document.createTextNode(item.soldCount));
              textodiv.appendChild(cantVend); 

          prod.appendChild(textodiv);

          let tituloimagenes = document.createElement("div"); /* Imágenes ilustrativas: -------------------- !!*/
              tituloimagenes.className = "tituloproducto"
              tituloimagenes.appendChild(document.createTextNode("Imágenes ilustrativas:"));
              textodiv.appendChild(tituloimagenes); 
     // imagenes.className = "galeria";            /*CLASE QUE SE PUEDEN USAR EN CSS, SE PUEDE AGREGAR MÁS*/
          
          for (let i of item.images){
              let imagen = document.createElement ("img");
              imagen.className = "imgprod";                          /*CLASE QUE SE PUEDEN USAR EN CSS, SE PUEDE AGREGAR MÁS*/
              imagen.src = i;
              prod.appendChild(imagen);
          }
     // prod.appendChild(textodiv);
      /*FIN BLOQUE IMÁGEN*/          
      contenedorTodo.appendChild(prod);
}

//////////////////////////////// Comentarios

let PRODUCT_ID = localStorage.getItem("prodID");
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODUCT_ID}.json`; 

function showComments(comments) {
  comments.forEach(comment => {
    let calificaciones = document.createElement("div");
    calificaciones.className = "calificaciones"; // Estilo para el bloque gris
    
    let calificacion = document.createElement("div");
    calificacion.className = "usuarioScore";
    calificacion.appendChild(document.createTextNode(comment.score));
    calificaciones.appendChild(calificacion);

    let usuario = document.createElement("div");
    usuario.className = "usuarioComentario";
    usuario.appendChild(document.createTextNode(comment.user + ":"));
    calificaciones.appendChild(usuario);

    let comentariodescription = document.createElement("div");
    comentariodescription.className = "ComentarioDescripcion";
    comentariodescription.appendChild(document.createTextNode(comment.description));
    calificaciones.appendChild(comentariodescription);

    let fecha = document.createElement("div");
    fecha.className = "fechaComentario";
    fecha.appendChild(document.createTextNode(comment.dateTime));
    calificaciones.appendChild(fecha);

    // Añadir el bloque de comentarios después de las imágenes
    contenedorTodo.appendChild(calificaciones);
  });
}


//////////////////////////////////////////////////// Fin

function respuesta (response) {
  return response.json();
}

function datos (data) {
  return showData (data);
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

// Solicitud para mostrar comentarios


mostrarProducto();

function mostrarCalificaciones () {
fetch(COMMENTS_URL)
  .then(respuesta)
  .then(comments => showComments(comments))
  .catch(esError);

}

mostrarCalificaciones();