document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
"use strict";

let url = "http://web-unicen.herokuapp.com/api/groups/400/tpe";

async function obtenerInfo() {
    try {
        let recibido = await fetch(url); //getting the info from servidor
        let json = await recibido.json();//casting to json
        renderizar(json);
    }
    catch (t) {
        console.log(t); 
    }
}
obtenerInfo();
async function renderizar(json){
    let planess = json.tpe;
    let html = "";
    planess.forEach(plan => {
        html += '<ion-card href="plan.html?'+plan._id+'"><ion-card-header><ion-card-title> Hotel: '+plan.thing.nombre+'</ion-card-title></ion-card-header>'+'<ion-card-content>';
        html += '<ion-label>Inicio: '+plan.thing.diaEntrada+'</ion-label></br>';
        html += '<ion-label>Fin: '+plan.thing.diaSalida+'</ion-label></br>';
        html += '<ion-text>Ubicación: '+plan.thing.ciudad+'</ion-text></ion-card-content></ion-card>';
    });
    document.getElementById('planes').innerHTML = html;
}

//deleteInfoServer();

  async function deleteInfoServer() {
    // Funcion para borrar toda la informacion de la API
    try {

      console.log('entro delete');

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
}