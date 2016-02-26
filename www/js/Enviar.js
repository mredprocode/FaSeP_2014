function tomaFoto() {
  navigator.camera.getPicture(function(e) {
    var a = document.getElementById("imagen_camara");
    a.style.visibility = "visible", a.style.display = "block", a.src = e, document.getElementById("cam").style.Color = "#00B90F", document.getElementById("sd").style.Color = "", document.getElementById("status_camara").innerHTML = "<span style='background-color:#00B90F;color:#FDFDFD;'>Foto capturada</span>";
    var a = document.getElementById("imagen_camara"),
      t = a.src;
    return t && "none" != a.style.display ? void(document.getElementById("nombre").value = t.substr(t.lastIndexOf("/") + 1)) : void(document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Toma una foto primero.</span>")
  }, function(e) {
    alert("Error al tomar foto:" + e), document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>No se tomó.</span>", document.getElementById("cam").style.Color = "#FF5700"
  }, {
    quality: 15,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}

function seleccionaFoto() {
  navigator.camera.getPicture(function(e) {
    var a = document.getElementById("imagen_camara");
    a.style.visibility = "visible", a.style.display = "block", a.src = e, document.getElementById("sd").style.Color = "#00B90F", document.getElementById("cam").style.Color = "", document.getElementById("status_camara").innerHTML = "<span style='background-color:#00B90F;color:#FDFDFD;'>Foto seleccionada</span>";
    var a = document.getElementById("imagen_camara"),
      t = a.src + ".jpg";
    return t && "none" != a.style.display ? void(document.getElementById("nombre").value = t.substr(t.lastIndexOf("/") + 1)) : void(document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Selecciona un archivo antes.</span>")
  }, function(e) {
    alert("Error al recuperarla foto: " + e), document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Error al recuperarla foto.</span>", document.getElementById("sd").style.Color = "#FF5700"
  }, {
    quality: 10,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    encodingType: navigator.camera.EncodingType.JPEG,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
  })
}

function uploadFoto() {
  var e = document.getElementById("imagen_camara"),
    a = e.src;
  if (!a || "none" == e.style.display) return void(document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Toma una foto o selecciona un archivo<span>");
  if (server = "http://geo24.zz.mu/upload.php", server) {
    options = new FileUploadOptions, options.fileKey = "file", options.mimeType = "image/jpeg", options.chunkedMode = !1, options.fileName = a.substr(a.lastIndexOf("/")).replace(".jpg", "");
    var t = new FileTransfer;
    t.upload(a, server, function(e) {
      function t(e) {
        alert(e + "Reporte enviado"), $.mobile.loadPage("#map-page", {
          allowSamePageTransition: !1,
          changeHash: !1,
          reloadPage: !1
        })
      }
      var o = $("#fallas1").val(),
        n = $("#Lugar1").val(),
        r = $("#Punto").val(),
        l = $("#LatY").val(),
        c = $("#LongX").val(),
        s = $("#Nombre1").val(),
        i = $("#email1").val(),
        m = options.fileName = a.substr(a.lastIndexOf("/")).replace(".jpg", "") + ".jpg";
      $.ajax({
        type: "POST",
        url: "http://geo24.zz.mu/fasepFull",
        data: {
          Falla: o,
          Lugar: n,
          Punto: r,
          LatY: l,
          LongX: c,
          Nombre: s,
          Email: i,
          Foto: m
        },
        cache: !1,
        dataType: "text",
        success: t
      }), document.getElementById("status_camara").innerHTML = "Carga completa: " + e.bytesSent + " bytes cargados."
    }, function(e) {
      document.getElementById("status_camara").innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>No se pudo caragar por = <span>" + e.code
    }, options)
  }
}
var options;
