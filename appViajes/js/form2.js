document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  "use strict";

  let volver = document.getElementById('volver');
  volver.addEventListener('click', fnVolver);

  function fnVolver() {
    window.location.replace("viaje1.html");
  }

  let button = document.getElementById('submit');
  button.addEventListener('click', siguiente);

  function siguiente() {
    let diaSalida = document.getElementById('diaSalida').value;
    let nuevaFecha = '2020-07-03';
    if (diaSalida > nuevaFecha) {
      alert('La fecha de salida excede la finalizacion del viaje');
    } else {
      window.location.replace("viaje2.html");
    }
  }
}