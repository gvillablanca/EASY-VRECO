//  Creamos la función que llama al script del mapa
function initMap() {
  var mainMap = { 
    lat: -33.431919, 
    lng: -70.647897 };
  var map = new google.maps.Map(document.getElementById('map'), {
    //  Indicamos el zoom que queremos aplicar en el mapa
    zoom: 17,
    //  Indicamos que el mapa con las coordenadas aparesca centrado
    center: mainMap
  });

  // Colocamos el marcador en el mapa
  var markadorMainMap = new google.maps.Marker({
    //  El marcador recibe la latitud y longitud de mainMap
    position: mainMap,
    // Se indica que el marcador aparesca en el mapa llamado map
    map: map 
  });
    // Creamos la función que buscará la localización del usuario
  function buscar() {
  //  Comprobamos que nuestro navegador tiene la propiedad de Geolocation que porporcionaráacceso a la ubicación de un dispositivo
    if (navigator.geolocation) { 
      //  Para obtener la ubicación del usuario llamamos al método "getCurrentPosition" con dos parámetros
      //  "funcionExito" se ejecuta solo cuando el usuario acepta compartir la informacion de ubicacion
      //  Si hay un error desconocido se invoca "funcionError"
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    };

    var latitud, longitud;
    var funcionExito = function(position) {
      //  Se obtiene la coordenada Latitud
      latitud = posicion.coords.latitude;
      //  Se obtiene la coordenada Longitud
      longitud = posicion.coords.longitude;
    };

    //  Creamos un marcador para nuestra ubicación
    var miUbicacion = new google.maps.Marker({
      position: { 
        lat: latitud, 
        lng: longitud },
      map: map
    });
    //  Acercamos el mapa con el zoom 
    map.setZoom(18);
    //  Asignamos un nuevo centro del mapa
    map.setCenter({ 
      lat: latitud, 
      lng: longitud });

    var functionError = function(error) {
      alert('Tenemos un problema con encontrar tu ubicación');
    };
    //  Asignamos con el evento click la función buscar
    document.getElementById('encuentrame').addEventListener('click', buscar);    
  }

  //  Llamamos a los inputs que queremos que tengan el autocompletado
  var inputPartida = document.getElementById('partida');
  var inputDestino = document.getElementById('destino');
  //  Por medio de la clase autocomplete indicamos que este input va a tener autocompletado
  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
  //  Declaramos las variables para realizar la ruta
  //  Con DirectionsService calculamos las indicaciones
  var directionsService = new google.maps.DirectionsService;
  //  Con DirectionsRenderer representamos estos resultados
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //  Ahora calculamos y mostramos la ruta
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    // DirectionsServices.route devuelve un DirectionsRequest
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      //  Si el status es OK, entonces se trazará la ruta. Si no, se envía un alert
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos una ruta');
      }
    });
  };
}
//  Indicamos al mapa que trace la ruta
directionsDisplay.setMap(map);  
 
var trazarRuta = function() {
  //  Declaramos la función "trazarRuta" que tendrá la función calculateAndDisplayRoute 
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};  
//  Al botón Trazar ruta le asignamos el evento click para que ejecute la función trazarRuta
document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);