const toggleBtn = document.getElementById('toggle-modonoche');
const body = document.body;
// Función para alternar entre modo claro y oscuro


let contTodo = document.getElementById("div_contenedorTodo");
let comentariosGeneral = document.getElementById("comentariosGeneral");
let calycomentarios = document.getElementById("div_calificacionesycomentarios");
let agregarComentario = document.getElementById("agregarComentario");
let container = document.getElementById("container");
let spinnerwrapper = document.getElementById("spinner-wrapper");
let cardbody = document.getElementById("tarjetas");
let prodcat = document.getElementById("prodcat");
let c_producto = document.getElementById("c_producto");
let productosAComprar = document.getElementById("productosAComprar");

if (localStorage.getItem("modo")){
  body.classList.add (localStorage.getItem("modo"));
  body.classList.remove (localStorage.getItem("modoOpuesto"));
  if (contTodo){
    contTodo.classList.add(localStorage.getItem("modo"));
    contTodo.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (calycomentarios){
    calycomentarios.classList.add (localStorage.getItem("modo"));
    calycomentarios.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (agregarComentario){
    agregarComentario.classList.add(localStorage.getItem("modo"));
    agregarComentario.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (spinnerwrapper){
    spinnerwrapper.classList.add(localStorage.getItem("modo"));
    spinnerwrapper.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (cardbody){
    cardbody.classList.add(localStorage.getItem("modo"));
    cardbody.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (prodcat){
    prodcat.classList.add(localStorage.getItem("modo"));
    prodcat.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (c_producto){
    c_producto.classList.add(localStorage.getItem("modo"));
    c_producto.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  if (productosAComprar){
    productosAComprar.classList.add(localStorage.getItem("modo"));
    productosAComprar.classList.remove (localStorage.getItem("modoOpuesto"));
  }
  
  
  
  

};