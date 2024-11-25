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

};