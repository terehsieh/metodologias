require([
    "esri/Map", //Modulo para crear el mapa.
    "esri/views/MapView",//Modulo para crear la vista del mapa.
    "esri/widgets/Locate",//Modulo para localizar ubicaciones.
    "esri/widgets/Track",//Modulo para crear el widget de rastreo.
    "esri/Graphic",//Modulo para crear graficos.
    "esri/widgets/Compass",//Modulo para crear la brujula.
    "esri/widgets/Search",//Modulo para crear el widget de busqueda
    "esri/layers/GraphicsLayer",//Modulo para crear una capa para dibujar sobre la vista.
    "esri/PopupTemplate"
    ],

  function(Map, MapView, Locate , Track, Graphic , Compass, Search, GraphicsLayer) {

  //se crea una instancia del mapa
  var map = new Map({
    basemap:"streets-navigation-vector"
  });

  //Se crea una vista del mapa, configurandose el contenedor donde se va a ubicar,(donde se introduce el mapa)
  //donde se va a centrar la vista por defecto al momento de cargar el mapa(en este caso las coordenadas del centro de tandil)
  //y el zoom inicial.
  var view = new MapView({
    container: "map",
    map: map,
    center: [ -59.16228754951315 , -37.30977935915216],
    zoom: 13
  });

  //Se crea la instancia de Track, esto genera un widget que luego hay que posicionarlo
  //en el mapa (view.ui.add(track, "top-left")).
  //Esta funcionalidad permite encontrar al usuario utilizando la geolocalizacion
  //del dispositivo.
  //Se crea un grafico (en este caso un punto verde) que va a ser la marca en el mapa de la ubicacion del usuario.
  var track = new Track({
   view: view,
   graphic: new Graphic({
     symbol: {
       type: "simple-marker",
       size: "12px",
       color: "green",
       outline: {
         color: "#efefef",
         width: "1.5px"
       }
     }
    }),
    useHeadingEnabled: true
  });

  view.ui.add(track, "top-left");

  //Arreglo con para guardar los objetos "ubicacion".
  let points = [];

  //Se crea una instancia de GraphicsLayer y se adhiere el mapa
  //Crea una capa sobre el que se van a dibujar los puntos con las ubicaciones

  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  //Se crea un listener del evento click sobre la vista del mapa.
  view.on("click" , function (e){
    // Se crea el objeto point con la ubicacion generada por el click.
    var point = {
      type: "point",
      longitude: e.mapPoint.longitude,
      latitude: e.mapPoint.latitude
    };
  //Se realiza una busqueda de la direccion utilizando las coordenadas del evento.
  search.clear();
  if (search.activeSource) {
    var geocoder = search.activeSource.locator;
    var params = {
      location: e.mapPoint
    };
    geocoder.locationToAddress(params)
    .then(function(response) {
      var address = response.attributes.Address;
      var longitude = response.location.longitude;
      var latitude = response.location.latitude;
      points.push(new ubicacion(address,longitude,latitude));//Con los datos de la ubicacion se crea un objeto y se lo agrega al arreglo de ubicaciones.
      console.log(response);
    });
  };
  //Se crea un grafico (un punto rojo) que se va a dibujar en lugar donde se hizo click.
  graficarPunto(point , "red");

});

//objeto ubicacion
function ubicacion (address , latitude ,longitude){
  this.address = address;
  this.latitude = latitude;
  this.longitude = longitude;
}

var ubi1 = new ubicacion( "Dique del fuerte" , -37.34333380543259 , -59.13091388357941);
var ubi2 = new ubicacion( "Cerro el Centinela" , -37.355099924769966 , -59.17028633158846 );
var ubi3 = new ubicacion( "Piedra Movediza" , -37.30977935915216 , -59.16228754951315);

points.push(ubi1);
points.push(ubi2);
points.push(ubi3);


function graficarPunto( punto , color){
  var graphic = new Graphic({
    geometry: punto,
    symbol: {
      type: "simple-marker",
      size: "12px",
      color: color,
      outline: {
        color: "#efefef",
        width: "1.5px"
      }
    }
  });
  graphicsLayer.add(graphic);
}

//Muestra los puntos cargados en el arreglo de ubicaciones
showPlans();

function showPlans(){

  for (var i = 0 ; i < points.length ; i++){
    console.log(points[i]);

    var point = {
      type: "point",
      longitude: points[i].longitude,
      latitude: points[i].latitude
    }
    graficarPunto( point , "blue" );
  }
};

//Se crea la instancia de compass, crea un widget(brujula).
//Se posiciona en la esquina superior izquierda de la vista.
var compass = new Compass({
    view: view
});
view.ui.add(compass, "top-left");

//Se crea la instancia de Search (input de busqueda).
//Se posiciona en la esquina inferior derecha de la vista.
var search = new Search({
  view: view
});

view.ui.add(search, "bottom-right");

//Se crear un listener a un evento click que genera un popup donde se
//muestran los datos de la ubicacion donde se hizo click.

view.on("click", function(evt){
       search.clear();
       view.popup.clear();
       if (search.activeSource) {
         var geocoder = search.activeSource.locator;
         var params = {
           location: evt.mapPoint
         };
         geocoder.locationToAddress(params)
           .then(function(response) {
             console.log(response);
             var address = response.address;
             showPopup(address, evt.mapPoint);
           }, function(err) {
             showPopup("No address found.", evt.mapPoint);
           });
       }
     });

  function showPopup(address, pt) {
     view.popup.open({
       title: address,
       content: + Math.round(pt.longitude * 100000)/100000 + "," + Math.round(pt.latitude * 100000)/100000,
       location: pt
     });
   }

});
