document.addEventListener("DOMContentLoaded", function(){

function redirect() {
    location.replace("http://127.0.0.1:5501/index.html")
}

const boton = document.getElementById("ingresoBtn");

let InputUsuario = document.getElementById("usuario");
let InputPassword = document.getElementById("password1");

function validacion (){
    if (InputUsuario.value.length>0 && InputPassword.value.length>0){
    sessionStorage.setItem("sesion", true);
    localStorage.setItem("usuario", InputUsuario);
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
