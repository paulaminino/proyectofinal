document.addEventListener('DOMContentLoaded', () => {
const departamento = document.getElementById('departamento');
const localidad = document.getElementById('localidad');
const calle = document.getElementById('calle');
const num = document.getElementById('numero-puerta');
const esquina = document.getElementById('esquina');
const btnCompra = document.getElementById('finalizar-compra');


// Los campos asociados a la dirección no podrán estar vacíos
// "Departamento", "Localidad", "Calle", "Número" y "Esquina".
function direccion() { 
    let isValid = true; 
    
    if (departamento.value === '') { 
    departamento.setCustomValidity('Debe ingresar un departamento'); 
    departamento.reportValidity();
    isValid = false; 
} else { 
    departamento.setCustomValidity(''); 
} 

if (localidad.value === '') { 
    localidad.setCustomValidity('Debe ingresar una localidad');
    localidad.reportValidity(); 
    isValid = false; 
} else { 
    localidad.setCustomValidity(''); 
} 

if (calle.value === '') { 
    calle.setCustomValidity('Debe ingresar una calle'); 
    calle.reportValidity();
    isValid = false; 
} else { 
    calle.setCustomValidity(''); 
} 
if (num.value === '') { 
    num.setCustomValidity('Debe ingresar el número de puerta');
    num.reportValidity();
    isValid = false; 
} else { 
    num.setCustomValidity('');
 } 
 if (esquina.value === '') { 
    esquina.setCustomValidity('Debe ingresar el nombre de la calle de la esquina'); 
    esquina.reportValidity();
    isValid = false; 
} else { 
    esquina.setCustomValidity(''); 
} 
return isValid;    
}

// Deberá estar seleccionada la forma de envío.
function formenvio (){
    if (!document.querySelector('input[name="tipo-envio"]:checked')) {
        alert ('Debe seleccionar una forma de envío');
        return false;
    }
    return true;
}

// Los campos para la forma de pago seleccionada no podrán estar vacíos.
// Deberá haberse seleccionado una forma de pago.
function formadepago (){
    if ( !document.querySelector('input[name="forma-pago"]:checked')){
        alert ('Debe seleccionar una forma de pago');
        return false;
    }
    return true;
}

// La cantidad para cada producto deberá estar definida y ser mayor a 0.
function cantidadProd (){
    const cantidades = document.querySelectorAll('input[id^="cantidad"]');
    for (const cantidad of cantidades) {
        if (cantidad.value <= 0 || isNaN(cantidad.value)) {
            alert('La cantidad del producto está en 0');
            return false;
        }
        
    }
    return true;
}

function validacion (){
    if (direccion () && formadepago() && formenvio () && cantidadProd()){
        alert ('Su compra se realizó exitosamente');
        return false;
    }
    return true;
}

btnCompra.addEventListener('click', validacion);

}); 