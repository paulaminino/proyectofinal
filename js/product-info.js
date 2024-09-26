/*INICIO Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
  let nombre = localStorage.getItem("usuario");
  document.getElementById("nom_usuario").innerHTML = nombre;
}
/*FIN Nombre Usuario en Barra: ENTREGA 2*/

let slideIndex = 1;

/*INICIO leectura JSON*/
let ID_PROD = localStorage.getItem("prodID");
const DATA_URL = `https://japceibal.github.io/emercado-api/products/${ID_PROD}.json`; // URL que contiene los datos que queremos mostrar


const contenedorTodo  = document.getElementById("div_contenedorTodo"); /*YA LO AGREGUÉ EN HTML*/

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
        let cadaProdRel = document.createElement ("div");
        cadaProdRel.className = "cadaRel"
        for (let k of item.relatedProducts){
          let imagenRel = document.createElement ("img");
            imagenRel.className = "imgrelacionado";
            imagenRel.src = k.image;
            cadaProdRel.appendChild(imagenRel);
          let infoRel = document.createElement ("div");
            infoRel.className = "infoRel";
            infoRel.appendChild(document.createTextNode(k.name));
            cadaProdRel.appendChild(infoRel); 
        }
        prodrelacionados.appendChild(cadaProdRel);
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

mostrarProducto();



