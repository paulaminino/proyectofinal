document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');

    const userLogueado = sessionStorage.getItem('sesion');
    const userEmail = localStorage.getItem('usuario');

    if (!userLogueado) {
        alert('Detectamos que no iniciaste sesión, redirigiendo para iniciar sesión');
        window.location.href = 'login.html';
    }

    if (userEmail) {
        email.value = userEmail;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        nombre.setCustomValidity('');
        apellido.setCustomValidity('');
        email.setCustomValidity('');
        nombre.classList.remove('is-invalid', 'is-valid');
        apellido.classList.remove('is-invalid', 'is-valid');
        email.classList.remove('is-invalid', 'is-valid');

        let isValid = true;

        if (nombre.value === '') {
            nombre.setCustomValidity('Debe ingresar un nombre.');
            nombre.classList.add('is-invalid'); 
            isValid = false;
        } else {
            nombre.classList.add('is-valid');
        }

        if (apellido.value === '') {
            apellido.setCustomValidity('Debe ingresar un apellido.');
            apellido.classList.add('is-invalid');
            isValid = false;
        } else {
            apellido.classList.add('is-valid');
        }

        if (email.value === '') {
            email.setCustomValidity('Debe ingresar un email.');
            email.classList.add('is-invalid'); 
            isValid = false; 
        } else {
            email.classList.add('is-valid');
        }

        if (isValid) {
            localStorage.setItem('nombre', nombre.value);
            localStorage.setItem('apellido', apellido.value);
            alert('Datos guardados');
        }

        nombre.reportValidity();
        apellido.reportValidity();
        email.reportValidity();
    });

    const nombreGuardado = localStorage.getItem('nombre');
    const apellidoGuardado = localStorage.getItem('apellido');

    if (nombreGuardado) {
        nombre.value = nombreGuardado;
    }

    if (apellidoGuardado) {
        apellido.value = apellidoGuardado;
    }

   

    const toggleBtn = document.getElementById('toggle-modonoche');

    function isChecked() {
        toggleBtn.checked = localStorage.getItem('modo') === 'dark';
      }
    
    isChecked ();

    

    function cambiarModo () {
        if (!localStorage.getItem("modo")){
            localStorage.setItem ("modoOpuesto", "light")
            return "dark"
        } else {
            if (localStorage.getItem("modo") == "light"){
                localStorage.setItem ("modoOpuesto", "light")
                return "dark"
            } else {
                localStorage.setItem ("modoOpuesto", "dark")
                return "light"
            }
        }
    }    

toggleBtn.addEventListener('click', () => {
    let modo = cambiarModo ();
    localStorage.setItem("modo", modo);
});
});