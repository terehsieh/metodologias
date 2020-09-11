document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  "use strict";

  let url = "http://web-unicen.herokuapp.com/api/groups/400/tpe";
  // URL es el link de la API
  fechaValida();

  async function obtenerInfo() {
    // Funcion para obtener la informacion de la API
    try {
      let recibido = await fetch(url); //getting the info from servidor
      let json = await recibido.json();//casting to json

      console.log(json);
    }
    catch (t) {
      console.log(t);
    }
  }

  //deleteInfoServer();

  async function deleteInfoServer() {
    // Funcion para borrar toda la informacion de la API
    try {


      try {
        let recibido = await fetch(url); //getting the info from servidor
        let json = await recibido.json();//casting to json

        for (let index = 1; index < json.tpe.length; index++) {

          let id = json.tpe[index]._id;
          await fetch(url + "/" + id, {
            "method": "DELETE",
          });

        }
      }
      catch (t) {
        console.log(t);
      }


    }
    catch (t) {
      console.log(t);
    }
  }

  async function enviarInfo(viaje) {
    // Funcion para enviar toda la informacion a la API
    try {
      await fetch(url, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(viaje),
      });
      window.location.replace("viaje2.html");
    }
    catch (t) {
      console.log(t);
    }
  }

  let volver = document.getElementById('volver');
  volver.addEventListener('click', fnVolver);

  function fnVolver() {
    window.location.replace("viaje2.html");
  }

  function fechaValida() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("diaEntrada").setAttribute("min", today);
    document.getElementById("diaSalida").setAttribute("min", today);
  }

  function obtenerDatosFormulario() {
    // Funcion para recopilar la informacion del formulario de planes
    let viaje = {
      "thing": {
        "estado": 'Confirmado',
        "nombre": document.querySelector("#hostelName").value,
        "direccion": document.querySelector("#address").value,
        "ciudad": document.querySelector("#inputCity").value,
        "cp": document.querySelector("#inputZip").value,
        "pagina": document.querySelector("#hostelURL").value,
        "email": document.querySelector("#email").value,
        "telefono": document.querySelector("#telefono").value,
        "habitaciones": document.querySelector("#rooms").value,
        "cantidadPersonas": document.querySelector("#personas").value,
        "tipoHabitacion": document.querySelector("#roomType").value,
        "diaEntrada": document.querySelector("#diaEntrada").value,
        "diaSalida": document.querySelector("#diaSalida").value,
        "checkIn": document.querySelector("#checkIn").value,
        "checkOut": document.querySelector("#checkOut").value,
        "desayuno": document.querySelector("#desayuno").checked,
        "limpieza": document.querySelector("#limpieza").checked,
        "coches": document.querySelector("#coches").checked,
        "estacionamiento": document.querySelector("#estacionamiento").checked,
      }
    };

    enviarInfo(viaje);
  }


  function validar() {
    let nombre, direccion, ciudad, cp, limpieza, pagina, email, telefono, habitaciones, cantidadPersonas, tipoHabitacion, diaEntrada, diaSalida, checkIn, checkOut, desayuno, coches, estacionamiento;
    nombre = document.querySelector("#hostelName").value;
    direccion = document.querySelector("#address").value;
    ciudad = document.querySelector("#inputCity").value;
    cp = document.querySelector("#inputZip").value;
    pagina = document.querySelector("#hostelURL").value;
    email = document.querySelector("#email").value;
    telefono = document.querySelector("#telefono").value;
    habitaciones = document.querySelector("#rooms").value;
    cantidadPersonas = document.querySelector("#personas").value;
    tipoHabitacion = document.querySelector("#roomType").value;
    diaEntrada = document.querySelector("#diaEntrada").value;
    diaSalida = document.querySelector("#diaSalida").value;
    checkIn = document.querySelector("#checkIn").value;
    checkOut = document.querySelector("#checkOut").value;
    desayuno = document.querySelector("#desayuno").checked;
    limpieza = document.querySelector("#limpieza").checked;
    coches = document.querySelector("#coches").checked;
    estacionamiento = document.querySelector("#estacionamiento").checked;

    if (nombre === "" || direccion === "" || ciudad === "" || cp === "" || email === "" || telefono === "") {
      alert("Debes completar todos los campos obligatorios");
    } 
    else {
      let diaSalida = document.getElementById('diaSalida').value;
      let nuevaFecha = '2020-07-03';
      if (diaSalida > nuevaFecha) {
        alert('La fecha de salida excede la finalizacion del viaje');
      } else {
        alert("El formulario fue enviado correctamente");
        obtenerDatosFormulario();
      }
    }
  }

  let button = document.querySelector("#submit");
  button.addEventListener("click", validar);
}
