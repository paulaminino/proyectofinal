document.addEventListener('DOMContentLoaded', () => {

    //INICIO Formulario
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

    //FIN Formulario

    //INICIO Imagen de Perfil
    let NuevaImgPerfil = document.getElementById("file-input");
    let imgPerfil = document.getElementById ("img-perfil");
    
    if (!localStorage.getItem("imgData")){
        localStorage.setItem("imgData", "")
    }

    if (imgPerfil.getAttribute("src") == "" && localStorage.getItem("imgData") == ""){
        imgPerfil.src = "/img/foto-perfil.png";
    } else {
        imgPerfil.src = localStorage.getItem("imgData");
    }
    
       const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);    
                fileReader.addEventListener('error', () => {
                    reject(error);
                }); 
                fileReader.addEventListener('load', () => {
                    resolve(fileReader.result);
                });
            });
        }
        
        const uploadImage = async (event) => {
            const file = event.target.files[0];
            const base64 = await convertBase64(file);
            cargarImagen (base64);
        };

        function cargarImagen (base64){            
            imgPerfil.src = base64;
            guardarImagen (base64);
        }
        
        function guardarImagen (imgData) {
            localStorage.setItem("imgData", imgData);
        }

      NuevaImgPerfil.addEventListener("change", (file) => {
        uploadImage(file);
    });


});
