
let slideIndex = 1;

/*INICIO leectura JSON*/
let ID_PROD = localStorage.getItem("prodID");
const DATA_URL = `https://japceibal.github.io/emercado-api/products/${ID_PROD}.json`; // URL que contiene los datos que queremos mostrar


const contenedorTodo  = document.getElementById("div_contenedorTodo"); /*YA LO AGREGUÉ EN HTML*/
const calificacionesycomentarios = document.getElementById("div_calificacionesycomentarios"); 

function showData (item) {
  //INICIO BLOQUE PRODUCTO//
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


          let tituloimagenes = document.createElement("div"); /* Imágenes ilustrativas: -------------------- !!*/
              tituloimagenes.className = "tituloproducto"
              tituloimagenes.appendChild(document.createTextNode("Imágenes ilustrativas:"));
              textodiv.appendChild(tituloimagenes); 
      prod.appendChild(textodiv);

      let imagenes = document.createElement("div");      
      imagenes.className = "galeria";
          let anterior = document.createElement("a");
          anterior.appendChild(document.createTextNode("<"));
          anterior.className = "prev";
          anterior.id = "pre";
          imagenes.appendChild (anterior);
          let posterior = document.createElement ("a");
          posterior.appendChild(document.createTextNode(">"));
          posterior.className = "next";
          posterior.id = "post";
          imagenes.appendChild (posterior);
          


          for (let i of item.images){
              let dvimg = document.createElement ("div");
              dvimg.className = "divimg";
              let imagen = document.createElement ("img");
              imagen.className = "imgprod";                          /*CLASE QUE SE PUEDEN USAR EN CSS, SE PUEDE AGREGAR MÁS*/
              imagen.src = i;
              dvimg.appendChild(imagen)
              imagenes.appendChild(dvimg);
          }
      prod.appendChild(imagenes);
      /*FIN BLOQUE IMÁGEN*/    
      contenedorTodo.appendChild(prod);
      //FIN BLOQUE PRODUCTO//

      //INICIO PRODUCTOS RELACIONADOS//      
      let prodrelacionados = document.createElement("div");
      prodrelacionados.className = "prodRelacionados";
        let tituloprodrelacionados = document.createElement("div");
              tituloprodrelacionados.className = "tituloproducto"
              tituloprodrelacionados.appendChild(document.createTextNode("Productos Relacionados:"));
              prodrelacionados.appendChild(tituloprodrelacionados);
        let ProdRel = document.createElement ("div");
        ProdRel.className = "ProdRel"
        for (let k of item.relatedProducts){
          let cadaProdRel = document.createElement ("div");
          cadaProdRel.className = "cadaRel"
          cadaProdRel.addEventListener('click', () => setProdID(k.id));
          let imagenRel = document.createElement ("img");
            imagenRel.className = "imgrelacionado";
            imagenRel.src = k.image;
            cadaProdRel.appendChild(imagenRel);
          let infoRel = document.createElement ("div");
            infoRel.className = "infoRel";
            infoRel.appendChild(document.createTextNode(k.name));
            cadaProdRel.appendChild(infoRel); 
          ProdRel.appendChild(cadaProdRel);
        }
        prodrelacionados.appendChild(ProdRel);
        contenedorTodo.appendChild(prodrelacionados);
      /*FIN PRODUTOS RELACIONADOS*/          


//INICIO CARRUSEL//

showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  let j;
  let slides = document.getElementsByClassName ("divimg");
  console.log(slides);
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (j = 0; j < slides.length; j++) {
    slides[j].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
//FIN CARRUSEL//
let ant = document.getElementById ("pre");
let post = document.getElementById("post");
ant.addEventListener ("click", function() {
  plusSlides(-1);
});
post.addEventListener ("click", function() {
  plusSlides(1);
});

}

// BOTÓN COMPRAR

function comprarProducto() {
  // Guardar el ID del producto
  const prodID = localStorage.getItem("prodID");
  localStorage.setItem("IDProdCarrito", prodID);
  // Guardar la cantidad del producto, le asignamos solo 1
  localStorage.setItem("cantProd", 1);
  // redirige a la página de carrito
  window.location = "cart.html";
}

const Botoncomprar = document.getElementById("botonComprar");
Botoncomprar.addEventListener("click", function() {
  comprarProducto(); 
});



// Comentarios

let PRODUCT_ID = localStorage.getItem("prodID");
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODUCT_ID}.json`; 

function showComments(comments) {
  let titulocalificacion = document.createElement("div");
  titulocalificacion.className = "tituloproducto";
  titulocalificacion.appendChild(document.createTextNode("Calificaciones de los usuarios"));
  calificacionesycomentarios.appendChild(titulocalificacion);
  agregarComentarios(comments);

  function agregarComentarios (comments){
    for (let comment of comments) {
      let calificaciones = document.createElement("div");
      calificaciones.className = "calificaciones"; // Estilo para el bloque gris
      
      let calificacion = document.createElement("div");
      calificacion.className = "usuarioScore";
      mostrarRatings(comment.score);
      calificaciones.appendChild(calificacion);
  
      function mostrarRatings(score) {
            calificacion.innerHTML += `<div class="rating">
                    <div class="stars">${'★'.repeat(score) + '☆'.repeat(5 - score)}</div></div>`;
    } 
  
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
      calificacionesycomentarios.appendChild(calificaciones);
    };

  }

  document.querySelector('button[type="submit"]').onclick = function(e) {
    e.preventDefault(); // No deja que se envíe el formulario y se recargue la página
    let nombre = localStorage.getItem("usuario");
    let comment = document.getElementById('comment').value;
    let rating = document.getElementById('rating').value;
    if (comment && rating) {
      let nuevoComentario = [];
      nuevoComentario.push({product: PRODUCT_ID, score: rating, description: comment, user:nombre ,dateTime: (new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString())});
      agregarComentarios(nuevoComentario);      
      document.getElementById('comment').value = ''; // Limpia el input de comentario
      document.getElementById('rating').value = '1'; // Resetea la calificación por estrellas
    }
  }

  
}

      

// Envío del formulario



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
function mostrarCalificaciones () {
fetch(COMMENTS_URL)
  .then(respuesta)
  .then(comments => showComments(comments))
  .catch(esError);
}

mostrarProducto();
mostrarCalificaciones();

/*INICIO Guarda el ID del producto seleccionado en la memoria local y redirige a la página de dicho producto*/
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}
/*FIN Guarda el ID del producto seleccionado en la memoria local y redirige a la página de dicho producto*/

const toggleBtn = document.getElementById('toggle-modonoche');
const body = document.body;
// Función para alternar entre modo claro y oscuro


let contTodo = document.getElementById("div_contenedorTodo");
let comentariosGeneral = document.getElementById("comentariosGeneral");
let calycomentarios = document.getElementById("div_calificacionesycomentarios");
let agregarComentario = document.getElementById("agregarComentario");
let container = document.getElementById("container");
let spinnerwrapper = document.getElementById("spinner-wrapper");

if (localStorage.getItem("modo")){
  body.classList.add (localStorage.getItem("modo"));
  body.classList.remove (localStorage.getItem("modoOpuesto"));
  contTodo.classList.add(localStorage.getItem("modo"));
  contTodo.classList.remove (localStorage.getItem("modoOpuesto"));
  calycomentarios.classList.add (localStorage.getItem("modo"));
  calycomentarios.classList.remove (localStorage.getItem("modoOpuesto"));
  agregarComentario.classList.add(localStorage.getItem("modo"));
  agregarComentario.classList.remove (localStorage.getItem("modoOpuesto"));
  spinnerwrapper.classList.add(localStorage.getItem("modo"));
  spinnerwrapper.classList.remove (localStorage.getItem("modoOpuesto"));

  console.log(body.classList)

};



