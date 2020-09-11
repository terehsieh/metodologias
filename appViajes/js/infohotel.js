document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
    "use strict";

    let url = "http://web-unicen.herokuapp.com/api/groups/400/tpe";
    let query = window.location.search.substring(1);

    obtenerInfo();

    let botonBorrar = document.getElementById('borrar');
    botonBorrar.addEventListener('click', borrarPlan);

    async function obtenerInfo() {
        try {

            let recibido = await fetch(url); //getting the info from servidor
            let json = await recibido.json();//casting to json


            let planes = json.tpe;

            planes.forEach(plan => {
                if (plan._id === query)
                    renderizar(plan.thing);
            });

        }
        catch (t) {
            console.log(t);
        }
    }

    async function borrarPlan() {
        //this function is responsible for editing the information on the server
        try {
            await fetch(url + "/" + query, {
                "method": "DELETE",
            });
            window.location.replace("viaje2.html");
        }
        catch (t) {
            console.log(t);
        }
    }


    async function renderizar(plan) {
        let html = "";

        html += '<ion-card><ion-card-header><ion-card-title> Hotel: ' + plan.nombre + '</a></ion-card-title></ion-card-header>' + '<ion-card-content>';
        html += '<ion-label>Direccion: ' + plan.direccion + '</ion-label></br>';
        html += '<ion-label>Ciudad: ' + plan.ciudad + '</ion-label></br>';
        html += '<ion-label>CP: ' + plan.cp + '</ion-label></br>';
        html += '<ion-label>Pagina web: ' + plan.pagina + '</ion-label></br>';
        html += '<ion-label>Email: ' + plan.email + '</ion-label></br>';
        html += '<ion-label>Telefono: ' + plan.telefono + '</ion-label></br>';
        html += '<ion-label>Habitaciones: ' + plan.habitaciones + '</ion-label></br>';
        html += '<ion-label>Cantidad de personas: ' + plan.cantidadPersonas + '</ion-label></br>';
        html += '<ion-label>Tipo habitacion: ' + plan.tipoHabitacion + '</ion-label></br>';
        html += '<ion-label>Dia de entrada: ' + plan.diaEntrada + '</ion-label></br>';
        html += '<ion-label>Dia de salida: ' + plan.diaSalida + '</ion-label></br>';
        html += '<ion-label>Check-in: ' + plan.checkIn + '</ion-label></br>';
        html += '<ion-label>Check-out: ' + plan.checkOut + '</ion-label></br>';
        if (plan.desayuno == true) {
            html += '<ion-label>Incluye Desayuno: Sí </ion-label></br>';
        }
        if (plan.desayuno == false) {
            html += '<ion-label>Incluye Desayuno: No </ion-label></br>';
        }
        if (plan.limpieza == true) {
            html += '<ion-label>Incluye Limpieza: Sí </ion-label></br>';
        }
        if (plan.limpieza == false) {
            html += '<ion-label>Incluye Limpieza: No </ion-label></br>';
        }
        if (plan.coches == true) {
            html += '<ion-label>Alquiler de coches: Sí </ion-label></br>';
        }
        if (plan.coches == false) {
            html += '<ion-label>Alquiler de coches: No </ion-label></br>';
        }
        if (plan.estacionamiento == true) {
            html += '<ion-label>Incluye estacionamiento: Sí </ion-label></br>';
        }
        if (plan.estacionamiento == false) {
            html += '<ion-label>Incluye stacionamiento: No </ion-label></br>';
        }
        html += '</ion-card-content></ion-card>';
        document.getElementById('contenido').innerHTML = html;
    }
}