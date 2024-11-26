document.addEventListener("DOMContentLoaded", function(){
    let contenedor = document.getElementById("compra");

    function MostrarCompra (){
        contenedor.innerHTML += `<div class="row container2">
      
      <div class="col radio div-tipo-envio">
      <h4>Tipo de envío</h4>
        <input type="radio" class="input-envio" id="premium" name="tipo-envio" value="premium" checked>
        <label class="label-envio" for="premium">Premium 2 a 5 días (15%)</label>
        <br>
        <input type="radio" class="input-envio" id="express" name="tipo-envio" value="express">
        <label class="label-envio" for="express">Express 5 a 8 días (7%)</label>
        <br>
        <input type="radio" class="input-envio" id="standard" name="tipo-envio" value="standard">
        <label class="label-envio" for="standard">Standard 12 a 15 días (5%)</label>
      </div>

      <!-- Forma de pago -->
      <div class="col radio">
        <h4>Forma de pago</h4>
        <div>
          <input type="radio" class="input-pago" id="tarjeta-credito" name="forma-pago" value="tarjeta-credito" checked>
          <label class="label-pago" for="tarjeta-credito">Tarjeta de crédito</label>
          <br>
          <input type="radio" class="input-pago" id="transferencia" name="forma-pago" value="transferencia">
          <label class="label-pago" for="transferencia">Transferencia bancaria</label>
        </div>
      </div>

      <div class="col costo">
        <h4>Costos</h4>
        <p>Subtotal: <span id="subtotal">$0.00</span></p>
        <p>Costo de envío: <span id="costo-envio">$0.00</span></p>
        <p>Total: <span id="costo-total">$0.00</span></p>
      </div>
    </div>

    <!-- Dirección de envío -->
    <div class="container2">
      <h4>Dirección de envío</h4>
      <form id="form-direccion">
        <div class="div-direccion" class="col">
          <input type="text" class="input-direccion" id="departamento" placeholder="Departamento" required>
          <input type="text" class="input-direccion" id="localidad" placeholder="Localidad" required>
          <input type="text" class="input-direccion" id="calle" placeholder="Calle" required>
          <input type="number" class="input-direccion" id="numero-puerta" placeholder="Número" min = "0" required>
          <input type="text" class="input-direccion" id="esquina" placeholder="Esquina" required>
        </div>
      </form>
    </div>

    <!-- Finalizar compra (btn) -->
    <div class="container">
      <button class="btn-finalizar-compra" id="finalizar-compra">Finalizar compra</button>
    </div>
  </main>
  <footer class="text-muted">
    <div class="container">
      <p class="float-end">
        <a href="#">Volver arriba</a>
      </p>
      <p>Este sitio forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a></p>
    </div>
  </footer>
  <div id="spinner-wrapper">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`
    };


    if (localStorage.getItem("CantCarrito") && localStorage.getItem("CantCarrito") > 0){
        MostrarCompra();
    }


});