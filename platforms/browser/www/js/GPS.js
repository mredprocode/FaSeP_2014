window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

// JavaScript Document
function onBodyload() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

//Llamar a sensores disponibles segun las APIs instaladas
function onDeviceReady() {
    //RECUPERAR DATOS

}

/////Cargar mapa GOOGLE MAPS//////
$(document).on("pageinit", "#map-page", "#formulario", function(e, data) {

    //Posicion por default en Toluca en caso de que el GPS no funcione
    var defaultLatLng = new google.maps.LatLng(19.290278, -99.657130);
    //Llamar datos de servico Rest
    // This URL won't work on your localhost, so you need to change it
    // see http://en.wikipedia.org/wiki/Same_origin_policy


    if (navigator.geolocation) {
        function success(pos) {
            //usar la posicion obtenida con GPS en Google
            var LLGPS = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            drawMap(LLGPS);
        }

        function fail(error) {
            alert('Error en servicio Geolocalizador');
            drawMap(defaultLatLng); //Si el GPS falla centrar el mapa en posicion por default
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        var options = {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 20000
        };
        navigator.geolocation.getCurrentPosition(success, fail, options);
    } else {
        drawMap(defaultLatLng); // No geolocation support, show default map
    }



    function drawMap(latlng) {
        //LLAMADA DE DATOS SOLICTADOS//	
		
        var $latitude;
        var $longitude;
        var geocoder = new google.maps.Geocoder();
        var lastMarker;
        var minZoomLevel = 16;
        var myOptions = {
            zoom: minZoomLevel,
            disableDefaultUI: true,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a2daf2"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f7f1df"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d0e3b4"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#bde6ab"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fbd3da"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffe15f"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#efd151"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "black"
                }]
            }, {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#cfb2db"
                }]
            }]
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);


        $('#btnaddmarker').on('click', function() {
            //-----------------------------------------------------
            var myOptions = {
                zoom: minZoomLevel,
                disableDefaultUI: true,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };

            if (lastMarker != null)
                lastMarker.setMap(null);


            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                draggable: true,
                title: "Reporte",
                icon: "css/img/location-pin.png",
                animation: google.maps.Animation.DROP
            });



            lastMarker = marker;
            var direccion;
            $latitude = marker.getPosition().lat();
            $longitude = marker.getPosition().lng();
            $('#Punto').val(String($longitude + " " + $latitude));
            $('#LatY').val(String($latitude));
            $('#LongX').val(String($longitude));
            geocoder.geocode({
                'latLng': marker.getPosition()
            }, function(resultados, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (resultados[0]) {
                        direccion = resultados[0].formatted_address;
                        infowindow.setContent(
                            '<div class="panel panel-default fuente">' +
                            '<div class="panel-heading text-center" style="background: #FF5700;"><h4 class="cabeza">Reportar falla</h4></div>' +
                            '<div class="panel-body">' +
                            '<form class="form-inline">' +
                            '<div class="form-group">' +
                            '<table style="width:100%">' +
                            '<tr>' +
                            '<td><label for="fallas"><strong><small>Fallas</small></strong>' + '<span style="color:#F4090D">*</span></label></td>' +
                            '<td>' +
                            '<select class="form-control" name="fallas" id="fallas">' +
                            '<option>Toca aqui para elegir una...</option>' +
                            '<option>Aguas negras</option>' +
                            '<option>Alcantarillado</option>' +
                            '<option>Alumbrado público</option>' +
                            '<option>Animales muertos</option>' +
                            '<option">Baches</option>' +
                            '<option>Banquetas Destrozadas</option>' +
                            '<option>Recolección Basura</option>' +
                            '<option>Drenaje pluvial</option>' +
                            '<option>Contaminación ambiental</option>' +
                            '<option>Fuga de agua</option>' +
                            '<option>Fuga de gas</option>' +
                            '<option>Limpia de parques y vías</option>' +
                            '<option>Obras públicas</option>' +
                            '<option>Árboles (plagas, caídos, tala ilegal</option>' +
                            '<option>Pavimentación</option>' +
                            '<option>Postes caídos</option>' +
                            '<option>Regulación sanitaria</option>' +
                            '<option>Salud pública</option>' +
                            '<option>Semáforos descompuestos</option>' +
                            '<option>Vehículos abandonados</option>' +
                            '</select>' +
                            '</td></tr><tr><td>' +
                            '<label for="Lugar"><strong><small>Lugar</small></strong>' + '<span style="color:#F4090D">*</span></label>' +
                            '</td><td>' +
                            '<input type="text" class="form-control" id="Lugar" value="' + direccion + '" disabled>' +
                            '</td></tr><tr><td>' +
                            '<label for="Nombre"><strong><small>Nombre</small></strong></label>' +
                            '</td><td>' +
                            '<input type="text" class="form-control" id="Nombre" placeholder="Nombre y Apellidos">' +
                            '</td></tr><tr><td>' +
                            '<label for="eMail"><strong><small>e-Mail:</small></strong></label>' +
                            '</td><td>' +
                            '<input type="email" class="form-control" id="email" placeholder="e-Mail"><br>' +
                            '</td></tr></table>' +
                            '<div align="center">' +
                            '<a href="" id="cam" onclick="tomaFoto();" class="btn btn-default glyphicon glyphicon-camera"> Cámara</a>' +
                            '<span>  </span>' +
                            '<a href="" id="sd" onclick="seleccionaFoto();" class="btn btn-default glyphicon glyphicon-picture"> Galería</a><br>' +
                            '<span id="status_camara"></span>' +
                            '</div>' +
                            '</div>' +
                            '<div align="center">' +
                            '<a  id="guardardatos" onclick="uploadFoto();" class="btn btn-success text-center " style="color: #FFFFFF;">Enviar Reporte</a>' +
                            '</div>' +
                            '</form>' +
                            '</div>' +
                            '</div>');

                        function displayVals() {
                            var singleValues = $("#fallas").val();
                            $('#fallas1').val(singleValues);
                            $('#Lugar1').val($("#Lugar").val());
                            $("#Nombre").keyup(function() {
                                var value = $(this).val();
                                $("#Nombre1").val(value);
                            }).keyup();
                            $("#email").keyup(function() {
                                var value = $(this).val();
                                $("#email1").val(value);
                            }).keyup();
                        }
                        $("select").change(displayVals);
                        displayVals();
                    }
                } //end IF
            }); //end geocoder
			
			var infowindow = new google.maps.InfoWindow({
                //content: html
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
                event.latLng;
            });

            google.maps.event.addListener(marker, 'dragend', function() {
                $latitude = marker.getPosition().lat();
                $longitude = marker.getPosition().lng();
                $('#Punto').val(String($longitude + " " + $latitude));
                $('#LatY').val(String($latitude));
                $('#LongX').val(String($longitude));
                geocoder.geocode({
                        'latLng': marker.getPosition()
                    },
                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                direccion = results[0].formatted_address;
                                infowindow.setContent('<div class="panel panel-default">' +
                                    '<div class="panel-heading text-center" style="background: #FF5700;"><h4 class="cabeza">Reportar falla</h4></div>' +
                                                      '<div class="panel-body">' +
                                    '<form class="form-inline">' +
                                    '<div class="form-group">' +
                                    '<table style="width:100%">' +
                                    '<tr>' +
                                    '<td><label for="fallas"><strong><small>Fallas</small></strong>' + '<span style="color:#F4090D">*</span></label></td>' +
                                    '<td>' +
                                    '<select class="form-control" name="fallas" id="fallas">' +
                                    '<option>Toca aqui para elegir una...</option>' +
                                    '<option>Aguas negras</option>' +
                                    '<option>Alcantarillado</option>' +
                                    '<option>Alumbrado público</option>' +
                                    '<option>Animales muertos</option>' +
                                    '<option">Baches</option>' +
                                    '<option>Banquetas Destrozadas</option>' +
                                    '<option>Recolección Basura</option>' +
                                    '<option>Drenaje pluvial</option>' +
                                    '<option>Contaminación ambiental</option>' +
                                    '<option>Fuga de agua</option>' +
                                    '<option>Fuga de gas</option>' +
                                    '<option>Limpia de parques y vías</option>' +
                                    '<option>Obras públicas</option>' +
                                    '<option>Árboles (plagas, caídos, tala ilegal</option>' +
                                    '<option>Pavimentación</option>' +
                                    '<option>Postes caídos</option>' +
                                    '<option>Regulación sanitaria</option>' +
                                    '<option>Salud pública</option>' +
                                    '<option>Semáforos descompuestos</option>' +
                                    '<option>Vehículos abandonados</option>' +
                                    '</select>' +
                                    '</td></tr><tr><td>' +
                                    '<label for="Lugar"><strong><small>Lugar</small></strong>' + '<span style="color:#F4090D">*</span></label>' +
                                    '</td><td>' +
                                    '<input type="text" class="form-control" id="Lugar" value="' + direccion + '" disabled>' +
                                    '</td></tr><tr><td>' +
                                    '<label for="Nombre"><strong><small>Nombre</small></strong></label>' +
                                    '</td><td>' +
                                    '<input type="text" class="form-control" id="Nombre" placeholder="Nombre y Apellidos">' +
                                    '</td></tr><tr><td>' +
                                    '<label for="eMail"><strong><small>e-Mail:</small></strong></label>' +
                                    '</td><td>' +
                                    '<input type="email" class="form-control" id="email" placeholder="e-Mail"><br>' +
                                    '</td></tr></table>' +
                                    '<div align="center">' +
                                    '<a href="" id="cam" onclick="tomaFoto();" class="btn btn-default glyphicon glyphicon-camera"> Cámara</a>' +
                                    '<span>  </span>' +
                                    '<a href="" id="sd" onclick="seleccionaFoto();" class="btn btn-default glyphicon glyphicon-picture"> Galería</a><br>' +
                                    '<span id="status_camara"></span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div align="center">' +
                                    '<a  id="guardardatos" onclick="uploadFoto();" class="btn btn-success text-center " style="color: #FFFFFF;">Enviar Reporte</a>' +
                                    '</div>' +
                                    '</form>' +
                                    '</div>' +
                                    '</div>');
                                infowindow.open(map, marker);
                            }
                            //ENVIAR RESUlTADOS OBTENIDOS A LABELS PARA SER RECUPERADOS CUANDO SE MUEVA EL INFOWINDOW
                            function displayVals() {
                                var singleValues = $("#fallas").val();
                                $('#fallas1').val(singleValues);
                                $('#Lugar1').val($("#Lugar").val());
                                $("#Nombre").keyup(function() {
                                    var value = $(this).val();
                                    $("#Nombre1").val(value);
                                }).keyup();
                                $("#email").keyup(function() {
                                    var value = $(this).val();
                                    $("#email1").val(value);
                                }).keyup();
                            }
                            $("select").change(displayVals);
                            displayVals();
                        }
                    });
            });


            infowindow.open(map, marker);
            //-----------------------------------------------------------------
        })
        var r = new google.maps.InfoWindow();

        $.getJSON('http://geo24.zz.mu/fasepMob', function(data) {
            options.crossDomain = true;
            console.log(JSON.stringify(data))
            var capa = JSON.stringify(data, undefined, 2);
            obj = JSON.parse(capa);
            var markers = [];
            $.each(obj.markers, function(key, data) {

           
                			var posit = new google.maps.LatLng(data.LatY, data.LongX);
                	
                			var markerR = new google.maps.Marker({
                				position: posit,
                				map: map,
                				icon: 'css/img/accident.png',
                				title: data.Falla
                			});
                			var details = data.Falla;

                bindInfoWindow(markerR, map, r, details);
                markers.push(markerR);

            });
			
            var markerCluster = new MarkerClusterer(map, markers);

        });

        function bindInfoWindow(markerR, map, r, strDescription) {

            google.maps.event.addListener(markerR, 'click', function() {
                r.setContent(strDescription);
                r.open(map, markerR);

            });
			
        }

    } //Fin Dibula mapa


});
//-----------------------------------------------------------------------------------------------