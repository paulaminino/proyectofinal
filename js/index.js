document.addEventListener("DOMContentLoaded", function(){
    const dropdown = document.getElementById('btnmenu');

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

/*Se crea el menú desplegable*/
if (localStorage.getItem("usuario")){
    let menuHTML = `
    <div class="dropdown" >
    <button class="nav-link btn dropdown-toggle autoClose" id="nom_usuario"  href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    </button> <!-- Nombre Usuario en Barra: ENTREGA 2 / Transformamos el nombre de usuario en menú desplegable: ENTREGA 5-->
    <ul class="dropdown-menu" id="dropdown2" >
      <li><a class="dropdown-item" href="sell.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><a class="dropdown-item" href="#" id="closesession">Cerrar Sesión</a></li>
    </ul>
  </div>
`;
dropdown.innerHTML = menuHTML;
}

    if (!sessionStorage.getItem("sesion")){ 
        alert("Detectamos que no iniciaste sesión, redirigiendo para iniciar sesión");
        window.location.href = "login.html"; 
          
    }
    /*INICIO Nombre Usuario en Barra: ENTREGA 2*/
    if (sessionStorage.getItem("sesion")) {
        let nombre = localStorage.getItem("usuario");
        document.getElementById("nom_usuario").innerHTML = nombre;  
    }
    /*FIN Nombre Usuario en Barra: ENTREGA 2*/

/*Borramos nombre de usuario de localStorage al cerrar sesión: ENTREGA 5*/
document.getElementById("closesession").addEventListener('click', function() {
        localStorage.removeItem("usuario");
        sessionStorage.removeItem("sesion")
        window.location = "login.html";
});

});