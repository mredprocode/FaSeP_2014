var options;
//Tomar una foto con la camara

function tomaFoto() {
    navigator.camera.getPicture(
        //Definir la direccion de la imagen
        function(uri) {
            //Se definen los valoresde la imagen y de donde provienen
            var img = document.getElementById('imagen_camara');
            img.style.visibility = "visible";
            img.style.display = "block";
            img.src = uri;
            document.getElementById('cam').style.Color = "#00B90F";
            document.getElementById('sd').style.Color = "";
            document.getElementById('status_camara').innerHTML = "<span style='background-color:#00B90F;color:#FDFDFD;'>Foto capturada</span>";

            //Se obtiene la direccion de donde se obtiene la imagen
            var img = document.getElementById('imagen_camara');
            //SE obtiene la fuente de la foto
            var imageURI = img.src;
            if (!imageURI || (img.style.display == "none")) {
                document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Toma una foto primero.</span>";
                return;
            }
            //Se obtiene el nombre de la imagen
            document.getElementById('nombre').value = imageURI.substr(imageURI.lastIndexOf('/') + 1);


        },
        //Si falla
        function(e) {
            alert("Error al tomar foto:" + e);
            document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>No se tomó.</span>";
            document.getElementById('cam').style.Color = "#FF5700";
        }, {
            quality: 15,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
};


//Selecciona imagen del album
function seleccionaFoto() {
    navigator.camera.getPicture(

        function(source) {
            var img = document.getElementById('imagen_camara');
            img.style.visibility = "visible";
            img.style.display = "block";
            img.src = source;

            document.getElementById('sd').style.Color = "#00B90F";
            document.getElementById('cam').style.Color = "";
            document.getElementById('status_camara').innerHTML = "<span style='background-color:#00B90F;color:#FDFDFD;'>Foto seleccionada</span>";

            //Se obtiene la direccion de donde se obtiene la imagen
            var img = document.getElementById('imagen_camara');
            //SE obtiene la fuente de la foto
            var imageURI = img.src + '.jpg';
            if (!imageURI || (img.style.display == "none")) {
                document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Selecciona un archivo antes.</span>";
                return;
            }

            //Se obtiene el nombre de la imagen
            document.getElementById('nombre').value = imageURI.substr(imageURI.lastIndexOf('/') + 1);

        },
        function(e) {
            alert("Error al recuperarla foto: " + e);
            document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Error al recuperarla foto.</span>";
            document.getElementById('sd').style.Color = "#FF5700";
        }, {
            quality: 10,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            encodingType: navigator.camera.EncodingType.JPEG,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });
};

function uploadFoto() {
    // Get URI of picture to upload
    var img = document.getElementById('imagen_camara');
    var imageURI = img.src;




    if (!imageURI || (img.style.display == "none")) {
        document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>Toma una foto o selecciona un archivo<span>";
        return;
    }


    // Verify server has been entered
    server = 'http://geo24.zz.mu/upload.php';

    if (server) {
        // Opciones de transferencia
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')).replace(".jpg", "");


        // Enviar foto a servidor "upload"
        var ft = new FileTransfer();

        ft.upload(imageURI, server, function(r) {
            var fallas = $("#fallas1").val();
            var lugars = $("#Lugar1").val();
            var puntos = $("#Punto").val();
			var laty = $("#LatY").val();
			var longX = $("#LongX").val();
            var nombres = $("#Nombre1").val();
            var emails = $("#email1").val();
            var foto = options.fileName = imageURI.substr(imageURI.lastIndexOf('/')).replace(".jpg", "") + ".jpg";


            $.ajax({
                type: "POST",
                url: "http://geo24.zz.mu/fasepFull",
				//DE aqui
                data: ({
                    Falla: fallas,
                    Lugar: lugars,
                    Punto: puntos,
					LatY: laty,
					LongX: longX,
                    Nombre: nombres,
                    Email: emails,
                    Foto: foto
                }),
                cache: false,
                dataType: "text",
                success: onSuccess
            });

            function onSuccess(data) {
                alert(data + "Reporte enviado");
                $.mobile.loadPage("#map-page", {
                    allowSamePageTransition: false,
                    //transition : 'slide',
                    changeHash: false,
                    reloadPage: true
                });
            };

            document.getElementById('status_camara').innerHTML = "Carga completa: " + r.bytesSent + " bytes cargados.";
        }, function(error) {
            document.getElementById('status_camara').innerHTML = "<span style='background-color:#E34600;color:#FDFDFD;'>No se pudo caragar por = <span>" + error.code;
        }, options);
    }
}