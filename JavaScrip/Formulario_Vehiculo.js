// URL
var UrlGetAll = 'http://localhost:5001/vehiculo/TodoslosVehiculos';
var UrlInsertVehiculo = 'http://localhost:5001/vehiculo/InsertarVehiculo';
var UrlDeleteVehiculo = 'http://localhost:5001/vehiculo/EliminarVehiculo';
var UrlGetById = 'http://localhost:5001/vehiculo/buscarporId';
var UrlUpdateVehiculo = 'http://localhost:5001/vehiculo/actualizarVehiculo';

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

//Función para actualizar un vehículo

function ActualizarVehiculo() {
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
        url: UrlUpdateVehiculo,
        type: 'PUT',
        data: datovehiculojson,
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            alert('Vehículo actualizado correctamente');
            CargarVehiculos();
            $('#ID_VEHICULO').prop('readonly', false);
            $('#btnAgregar').show();
            $('#btnActualizar').hide();
        },
        error: function(xhr, textStatus, errorThrown) {
            alert('Error al actualizar vehículo: ' + textStatus);
        }
    });
}

//Funcion para eliminar vehiculo

function EliminarVehiculo(id_vehiculo) {
    if (!confirm('¿Está seguro que desea eliminar este vehículo?')) {
        return;
    }
    
    var datovehiculo = {
        id_vehiculo: id_vehiculo
    };
    
    var datovehiculojson = JSON.stringify(datovehiculo);
    
    $.ajax({
        url: UrlDeleteVehiculo,
        type: 'DELETE',
        data: datovehiculojson,
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            alert("Vehículo eliminado correctamente");
            CargarVehiculos();
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Error al eliminar vehículo: " + textStatus);
        }
    });
}

// funcion para limpiar
function limpiarFormulario() {
    $("#FormVehiculo")[0].reset();
    $('#ID_VEHICULO').prop('readonly', false);
    $('#btnAgregar').show();
    $('#btnActualizar').hide();
}