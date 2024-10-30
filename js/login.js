document.addEventListener("DOMContentLoaded", function(){

function redirect() {
    window.location.href = "index.html";
}

const boton = document.getElementById("ingresoBtn");

let InputUsuario = document.getElementById("usuario");
let InputPassword = document.getElementById("password1");

// Para que el usuario sea un email
document.getElementById('ingresoBtn').addEventListener('click', function(e) {
    const emailInput = document.getElementById('usuario');
    if (!emailInput.checkValidity()) {
      e.preventDefault(); // Previene el envío si el email es inválido
      alert('Ingrese un email válido para continuar');
    }
  });
  
  function validacion() {
    if (InputUsuario.checkValidity() && InputPassword.value.length > 0) {
      sessionStorage.setItem("sesion", true);
      localStorage.setItem("usuario", InputUsuario.value);
      return true;
    } else {
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
