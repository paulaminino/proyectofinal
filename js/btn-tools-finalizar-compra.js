document.addEventListener('DOMContentLoaded', () => {
const cantidad = document.getElementById('cantidad50921');
const departamento = document.getElementById('departamento');
const localidad = document.getElementById('localidad');
const calle = document.getElementById('calle');
const num = document.getElementById('numero-puerta');
const esquina = document.getElementById('esquina');
const btnCompra = document.getElementById('finalizar-compra');



// Los campos asociados a la dirección no podrán estar vacíos
// "Departamento", "Localidad", "Calle", "Número" y "Esquina".
function direccion (){
    if (departamento.value === '') {
        nombre.classList.add('is-invalid');
        alert ('Debe ingresar una departamento');
    } else {
        if (localidad.value === '') {
            alert('Debe ingresar una localidad')
        } else {
            if (calle.value === ''){
                alert('Debe ingresar una calle')
            } else {
                if (num.value === ''){
                    alert('Debe ingresar el número de puerta')
                } else {
                    if (esquina.value === '') {
                        alert ('Debe ingresar el nombre de la calle de la esquina')
                    }
                }
            }
        }
    }
}

// Deberá estar seleccionada la forma de envío.
function formenvio (){
    if (!document.querySelector('input[name="tipo-envio"]:checked')) {
        alert ('Debe seleccionar una forma de envío')
    }
}

// Los campos para la forma de pago seleccionada no podrán estar vacíos.
// Deberá haberse seleccionado una forma de pago.
function formadepago (){
    if ( !document.querySelector('input[name="forma-pago"]:checked')){
        alert ('Debe seleccionar una forma de pago')
    }
}

// La cantidad para cada producto deberá estar definida y ser mayor a 0.
function cantidad (){
    if (cantidad.value < 0) {
        alert ('La cantidad del producto esta en 0');
    } else {
        if (prod.value === ''){
            alert('No está definida la cantidad de su producto')
        }
    }
}

function validacion (){
    if (direccion () && formadepago() && formenvio () && cantidad){
        alert ('Su compra se realizó exitosamente')
    }
}

btnCompra.addEventListener('click', validacion ());

}); 