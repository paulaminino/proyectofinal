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
 
        if (!localStorage.getItem("usuario")){
            dropdown.classList.add('oculto');
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