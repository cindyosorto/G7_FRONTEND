// URL
var UrlGetAll = 'http://localhost:5001/vehiculo/TodoslosVehiculos';


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