document.addEventListener('DOMContentLoaded', () => {
    let carroVacio = true;
    let contenedorTodo  = document.getElementById("productosAComprar");

function CarritoVacio (){
    if (!localStorage.getItem("CantCarrito") || localStorage.getItem("CantCarrito") == "" || localStorage.getItem("CantCarrito") == 0){
        alert("Detectamos que no tenes productos en tu carrito");
    } else {
        carroVacio = false;
    }
}

function MostrarProductosCarro (){

    function showProductosC (item){
        let prod = document.createElement("div");
        prod.className = "producto";
        prod.classList.add ("row");
            let dvimg = document.createElement ("div");
            dvimg.className = "col-lg-4";
            let imagen = document.createElement ("img");
            imagen.className = "img";                          /*CLASE QUE SE PUEDEN USAR EN CSS, SE PUEDE AGREGAR MÁS*/
            imagen.src = item.images[0];
            dvimg.appendChild(imagen)
        prod.appendChild(dvimg);

            let textodiv = document.createElement("div"); /* div para todo texto */
            textodiv.className = "col-lg-7";             

                let nombre = document.createElement("div");
                nombre.className = "nombreproducto";
                textodiv.appendChild(nombre);
                nombre.appendChild(document.createTextNode(item.name));

                let titulocosto = document.createElement("div"); /* Texto Precio: -------------------- !!*/
                titulocosto.className = "descripcion"
                titulocosto.appendChild(document.createTextNode("Precio:"));
                textodiv.appendChild(titulocosto); 

                let costo = document.createElement("div");
                costo.className = "descripcion";            
                costo.appendChild(document.createTextNode(item.currency + " " + item.cost));
                textodiv.appendChild(costo);

                textodiv.innerHTML += `<form action=>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" name="cantidad" min="0"placeholder="1">
                <button class="btn" type="button" id="guardarCant">Guardar</button>
                </form>`

                 let titulosubtotal = document.createElement("div"); /* Texto Subtotal: -------------------- !!*/
                titulosubtotal.className = "descripcion"
                titulosubtotal.appendChild(document.createTextNode("Subtotal:"));
                textodiv.appendChild(titulosubtotal); 

                let subtotal = document.createElement("div");
                subtotal.className = "descripcion";
                let cant = parseInt(localStorage.getItem("cantProd"));
                let sub = item.cost*cant;
                subtotal.appendChild(document.createTextNode(item.currency + " " + sub));
                textodiv.appendChild(subtotal);



        prod.appendChild(textodiv);
    contenedorTodo.appendChild(prod);

    let inputCant = document.getElementById("cantidad");
    if (localStorage.getItem ("cantProd")){
        inputCant.value = localStorage.getItem ("cantProd");
    }

    function guardarCant () {
        let inputCant = document.getElementById("cantidad");
        localStorage.setItem ("cantProd", inputCant.value);
        subtotal.removeChild(subtotal.firstChild);
        subtotal.appendChild(document.createTextNode(item.currency + " " + item.cost*parseInt(localStorage.getItem("cantProd"))));
    }
    
    let boton = document.getElementById("guardarCant");
    boton.addEventListener('click', guardarCant);
    alert("El producto fue agregado a su carrito");
    agregarBadges()

    }

    function respuesta (response) {
        return response.json();
      }  
      function datos (data) {
        return showProductosC (data);
      }  
      function esError(error){
        console.error ("Ocurrió error", error);
      }  
      function mostrarProductosC (DATA_URL) {
        fetch(DATA_URL)
        .then(respuesta)
        .then(datos)
        .catch(esError);
      }

    if (!carroVacio) {
        let arregloProd = JSON.parse(localStorage.getItem("IDProdCarrito"));
        for (idProductoCarrito of arregloProd){
            let DATA_URL = `https://japceibal.github.io/emercado-api/products/${idProductoCarrito}.json`; 50921
            mostrarProductosC (DATA_URL);
        }
        

        
    }
    function agregarBadges() {
        
        const cuenta = prueba.reduce((acum, current) => acum + current.cantidad, 0);
        document.getElementById('cuentaCarrito').innerText = cuenta;
      }
    
}

if (!localStorage.getItem ("cantProd")){
        localStorage.setItem ("cantProd", 1)
    }


CarritoVacio ();
MostrarProductosCarro ();





});