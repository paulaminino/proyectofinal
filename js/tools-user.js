document.addEventListener("DOMContentLoaded", function () {

const dropdown = document.getElementById('btnmenu'); //Constante para traer el id donde se va a cargar el menú desplegable. 

/*Se crea el menú desplegable: Entrega 5*/
if (localStorage.getItem("usuario")){
    let menuHTML = `
    <div class="dropdown" >
    <button class="nav-link btn dropdown-toggle autoClose" id="nom_usuario"  href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    </button> <!-- Nombre Usuario en Barra: ENTREGA 2 / Transformamos el nombre de usuario en menú desplegable: ENTREGA 5-->
    <ul class="dropdown-menu" id="dropdown2">
      <li><a class="dropdown-item" href="cart.html">Mi carrito<span id= "cuentacarrito" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">0
      <span class="visually-hidden">unread messages</span>
    </span></a></li>
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><a class="dropdown-item" href="#" id="closesession">Cerrar Sesión</a></li>
    </ul>
  </div>
`;
dropdown.innerHTML = menuHTML;
}

/* Nombre Usuario en Barra: ENTREGA 2*/
if (sessionStorage.getItem("sesion")) {
    let nombre = localStorage.getItem("usuario");
    document.getElementById("nom_usuario").innerHTML = nombre;  
}

/*Borramos nombre de usuario de localStorage al cerrar sesión: ENTREGA 5*/
document.getElementById("closesession").addEventListener('click', function() {
    localStorage.clear("usuario");
    sessionStorage.clear("sesion")
    window.location = "login.html";
});

function agregarBadges() {
  let arreglo = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = arreglo.reduce((total, producto) => total + parseInt(producto.cantidad), 0);
  document.getElementById("cuentacarrito").innerText = total;

}

agregarBadges();


});