document.addEventListener("DOMContentLoaded", function(){

function redirect() {
    window.location.href = "index.html";
}

const boton = document.getElementById("ingresoBtn");

let InputUsuario = document.getElementById("usuario");
let InputPassword = document.getElementById("password1");

function validacion (){
    if (InputUsuario.value.length>0 && InputPassword.value.length>0){
    sessionStorage.setItem("sesion", true);
    localStorage.setItem("usuario", InputUsuario.value);  /*Guardo usuario en memoria local ENTREGA 2 */
    return true;

    } else{
    return false;
}
}


function show (){
    if (validacion()){
        redirect();
        return true;
    } else {
        alert("Complete todos los campos para continuar");
        return false;
    }

}



boton.addEventListener('click', show);

});
