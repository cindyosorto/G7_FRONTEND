// URL
var UrlGetAll = 'http://localhost:5001/vehiculo/TodoslosVehiculos';
var UrlInsertVehiculo = 'http://localhost:5001/vehiculo/InsertarVehiculo';


$(document).ready(function() {
    CargarVehiculos();
});

// Función para cargar todos los vehiculos en la tabla
function CargarVehiculos() {
    $.ajax({
        url: UrlGetAll,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var items = response;
            var valores = '';
            
            for(var i = 0; i < items.length; i++) {
                valores += '<tr>' +
                    '<td>' + items[i].id_vehiculo + '</td>' +
                    '<td>' + items[i].marca + '</td>' +
                    '<td>' + items[i].modelo + '</td>' +
                    '<td>' + items[i].anio + '</td>' +
                    '<td>' + items[i].fecha_matricula + '</td>' +
                    '<td>' + items[i].numero_placa + '</td>' +
                    '<td>' + items[i].estado + '</td>' +
                    '<td>' +
                    '<button class="btn btn-info" onclick="CargarVehiculoParaEditar(\'' + items[i].id_vehiculo + '\')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                    '<button class="btn btn-danger" onclick="EliminarVehiculo(\'' + items[i].id_vehiculo + '\')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
            }
            
            $('#DataVehiculos').html(valores);
        },
        error: function(xhr, status, error) {
            console.error("Error al cargar vehículos:", error);
            alert("Error al cargar vehículos. Ver consola para más detalles.");
        }
    });
    
    limpiarFormulario();
}

//Función para agregar un vehículo
function AgregarVehiculo() {
    var datovehiculo = {
        id_vehiculo: $('#ID_VEHICULO').val(),
        marca: $('#MARCA').val(),
        modelo: $('#MODELO').val(),
        anio: $('#ANIO').val(),
        fecha_matricula: $('#FECHA_MATRICULA').val(),
        numero_placa: $('#NUMERO_PLACA').val(),
        estado: $('#ESTADO').val()
    };
    
    var datovehiculojson = JSON.stringify(datovehiculo);
    
    $.ajax({
        url: UrlInsertVehiculo,
        type: 'POST',
        data: datovehiculojson,
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            alert('Vehículo agregado correctamente');
            CargarVehiculos();
        },
        error: function(xhr, textStatus, errorThrown) {
            alert('Error al agregar vehículo: ' + textStatus + ' - ' + errorThrown);
        }
    });
}

