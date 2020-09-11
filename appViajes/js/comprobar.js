document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
    "use strict";

    let url = "http://web-unicen.herokuapp.com/api/groups/400/tpe";

    let boton = document.getElementById('link');
    boton.addEventListener('click', obtenerInfo);

    async function obtenerInfo() {
        try {
            let recibido = await fetch(url); //getting the info from servidor
            let json = await recibido.json();//casting to json
            console.log(json.tpe.length);
            if (json.tpe.length > 1) {
                window.location.replace("viaje2.html");
            } else {
                window.location.replace("viaje1.html");
            }
        }
        catch (t) {
            console.log(t);
        }
    }

}