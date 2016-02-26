function onBodyload() {
  document.addEventListener("deviceready", onDeviceReady, !1)
}

function onDeviceReady() {}
$(document).on("pageinit", "#map-page", "#formulario", function(o, e) {
  function a(o) {
    var e = new google.maps.LatLng(o.coords.latitude, o.coords.longitude);
    l(e)
  }

  function t(o) {
    alert("Error en servicio Geolocalizador"), l(n)
  }

  function l(o) {
    function e(o, e, a, t) {
      google.maps.event.addListener(o, "click", function() {
        a.setContent(t), a.open(e, o)
      })
    }
    var a, t, l, n = new google.maps.Geocoder,
      s = 16,
      r = {
        zoom: s,
        disableDefaultUI: !0,
        center: o,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
          featureType: "water",
          elementType: "geometry",
          stylers: [{
            color: "#a2daf2"
          }]
        }, {
          featureType: "landscape.man_made",
          elementType: "geometry",
          stylers: [{
            color: "#f7f1df"
          }]
        }, {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{
            color: "#d0e3b4"
          }]
        }, {
          featureType: "landscape.natural.terrain",
          elementType: "geometry",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{
            color: "#bde6ab"
          }]
        }, {
          featureType: "poi",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "poi.medical",
          elementType: "geometry",
          stylers: [{
            color: "#fbd3da"
          }]
        }, {
          featureType: "poi.business",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{
            visibility: "on"
          }]
        }, {
          featureType: "road",
          elementType: "labels",
          stylers: [{
            visibility: "on"
          }]
        }, {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{
            color: "#ffe15f"
          }]
        }, {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{
            color: "#efd151"
          }]
        }, {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [{
            color: "#ffffff"
          }]
        }, {
          featureType: "road.local",
          elementType: "geometry.fill",
          stylers: [{
            color: "black"
          }]
        }, {
          featureType: "transit.station.airport",
          elementType: "geometry.fill",
          stylers: [{
            color: "#cfb2db"
          }]
        }]
      },
      p = new google.maps.Map(document.getElementById("map-canvas"), r);
    $("#btnaddmarker").on("click", function() {
      ({
        zoom: s,
        disableDefaultUI: !0,
        center: o,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      null != l && l.setMap(null);
      var e = new google.maps.Marker({
        position: o,
        map: p,
        draggable: !0,
        title: "Reporte",
        icon: "css/img/location-pin.png",
        animation: google.maps.Animation.DROP
      });
      l = e;
      var i;
      a = e.getPosition().lat(), t = e.getPosition().lng(), $("#Punto").val(String(t + " " + a)), $("#LatY").val(String(a)), $("#LongX").val(String(t)), n.geocode({
        latLng: e.getPosition()
      }, function(o, e) {
        function a() {
          var o = $("#fallas").val();
          $("#fallas1").val(o), $("#Lugar1").val($("#Lugar").val()), $("#Nombre").keyup(function() {
            var o = $(this).val();
            $("#Nombre1").val(o)
          }).keyup(), $("#email").keyup(function() {
            var o = $(this).val();
            $("#email1").val(o)
          }).keyup()
        }
        e == google.maps.GeocoderStatus.OK && o[0] && (i = o[0].formatted_address, r.setContent('<div class="panel panel-default fuente"><div class="panel-heading text-center" style="background: #FF5700;"><h4 class="cabeza">Reportar falla</h4></div><div class="panel-body"><form class="form-inline"><div class="form-group"><table style="width:100%"><tr><td><label for="fallas"><strong><small>Fallas</small></strong><span style="color:#F4090D">*</span></label></td><td><select class="form-control" name="fallas" id="fallas"><option>Toca aqui para elegir una...</option><option>Aguas negras</option><option>Alcantarillado</option><option>Alumbrado público</option><option>Animales muertos</option><option">Baches</option><option>Banquetas Destrozadas</option><option>Recolección Basura</option><option>Drenaje pluvial</option><option>Contaminación ambiental</option><option>Fuga de agua</option><option>Fuga de gas</option><option>Limpia de parques y vías</option><option>Obras públicas</option><option>Árboles (plagas, caídos, tala ilegal</option><option>Pavimentación</option><option>Postes caídos</option><option>Regulación sanitaria</option><option>Salud pública</option><option>Semáforos descompuestos</option><option>Vehículos abandonados</option></select></td></tr><tr><td><label for="Lugar"><strong><small>Lugar</small></strong><span style="color:#F4090D">*</span></label></td><td><input type="text" class="form-control" id="Lugar" value="' + i + '" disabled></td></tr><tr><td><label for="Nombre"><strong><small>Nombre</small></strong></label></td><td><input type="text" class="form-control" id="Nombre" placeholder="Nombre y Apellidos"></td></tr><tr><td><label for="eMail"><strong><small>e-Mail:</small></strong></label></td><td><input type="email" class="form-control" id="email" placeholder="e-Mail"><br></td></tr></table><div align="center"><a href="" id="cam" onclick="tomaFoto();" class="btn btn-default glyphicon glyphicon-camera"> Cámara</a><span>  </span><a href="" id="sd" onclick="seleccionaFoto();" class="btn btn-default glyphicon glyphicon-picture"> Galería</a><br><span id="status_camara"></span></div></div><div align="center"><a  id="guardardatos" onclick="uploadFoto();" class="btn btn-success text-center " style="color: #FFFFFF;">Enviar Reporte</a></div></form></div></div>'), $("select").change(a), a())
      });
      var r = new google.maps.InfoWindow({});
      google.maps.event.addListener(e, "click", function() {
        r.open(p, e), event.latLng
      }), google.maps.event.addListener(e, "dragend", function() {
        a = e.getPosition().lat(), t = e.getPosition().lng(), $("#Punto").val(String(t + " " + a)), $("#LatY").val(String(a)), $("#LongX").val(String(t)), n.geocode({
          latLng: e.getPosition()
        }, function(o, a) {
          function t() {
            var o = $("#fallas").val();
            $("#fallas1").val(o), $("#Lugar1").val($("#Lugar").val()), $("#Nombre").keyup(function() {
              var o = $(this).val();
              $("#Nombre1").val(o)
            }).keyup(), $("#email").keyup(function() {
              var o = $(this).val();
              $("#email1").val(o)
            }).keyup()
          }
          a == google.maps.GeocoderStatus.OK && (o[0] && (i = o[0].formatted_address, r.setContent('<div class="panel panel-default"><div class="panel-heading text-center" style="background: #FF5700;"><h4 class="cabeza">Reportar falla</h4></div><div class="panel-body"><form class="form-inline"><div class="form-group"><table style="width:100%"><tr><td><label for="fallas"><strong><small>Fallas</small></strong><span style="color:#F4090D">*</span></label></td><td><select class="form-control" name="fallas" id="fallas"><option>Toca aqui para elegir una...</option><option>Aguas negras</option><option>Alcantarillado</option><option>Alumbrado público</option><option>Animales muertos</option><option">Baches</option><option>Banquetas Destrozadas</option><option>Recolección Basura</option><option>Drenaje pluvial</option><option>Contaminación ambiental</option><option>Fuga de agua</option><option>Fuga de gas</option><option>Limpia de parques y vías</option><option>Obras públicas</option><option>Árboles (plagas, caídos, tala ilegal</option><option>Pavimentación</option><option>Postes caídos</option><option>Regulación sanitaria</option><option>Salud pública</option><option>Semáforos descompuestos</option><option>Vehículos abandonados</option></select></td></tr><tr><td><label for="Lugar"><strong><small>Lugar</small></strong><span style="color:#F4090D">*</span></label></td><td><input type="text" class="form-control" id="Lugar" value="' + i + '" disabled></td></tr><tr><td><label for="Nombre"><strong><small>Nombre</small></strong></label></td><td><input type="text" class="form-control" id="Nombre" placeholder="Nombre y Apellidos"></td></tr><tr><td><label for="eMail"><strong><small>e-Mail:</small></strong></label></td><td><input type="email" class="form-control" id="email" placeholder="e-Mail"><br></td></tr></table><div align="center"><a href="" id="cam" onclick="tomaFoto();" class="btn btn-default glyphicon glyphicon-camera"> Cámara</a><span>  </span><a href="" id="sd" onclick="seleccionaFoto();" class="btn btn-default glyphicon glyphicon-picture"> Galería</a><br><span id="status_camara"></span></div></div><div align="center"><a  id="guardardatos" onclick="uploadFoto();" class="btn btn-success text-center " style="color: #FFFFFF;">Enviar Reporte</a></div></form></div></div>'), r.open(p, e)), $("select").change(t), t())
        })
      }), r.open(p, e)
    });
    var c = new google.maps.InfoWindow,
      d = io.connect("http://geo24.zz.mu/fasepMob");
    d.on("connected", function(o) {
      console.log(o)
    }), $.getJSON("http://geo24.zz.mu/fasepMob", function(o) {
      i.crossDomain = !0, console.log(JSON.stringify(o));
      var a = JSON.stringify(o, void 0, 2);
      obj = JSON.parse(a);
      var t = [];
      $.each(obj.markers, function(o, a) {
        var l = new google.maps.LatLng(a.LatY, a.LongX),
          n = new google.maps.Marker({
            position: l,
            map: p,
            icon: "css/img/accident.png",
            title: a.Falla
          }),
          i = a.Falla;
        e(n, p, c, i), t.push(n)
      });
      new MarkerClusterer(p, t)
    })
  }
  new FastClick(document.body);
  var n = new google.maps.LatLng(19.290278, -99.65713);
  if (navigator.geolocation) {
    var i = {
      maximumAge: 5e5,
      enableHighAccuracy: !0,
      timeout: 2e4
    };
    navigator.geolocation.getCurrentPosition(a, t, i)
  } else l(n)

});
