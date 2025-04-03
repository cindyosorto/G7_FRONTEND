class ClienteApp {
    constructor() {
        console.log('Inicializando aplicación ClienteApp...');
        this.clienteIdActual = null;
        this.apiUrl = 'http://localhost:5005/api/clientes';
        this.initSelectors();
        this.bindEvents();
        this.setupModalHandlers();
        this.cargarClientes();
    }

    initSelectors() {
        this.$tablaClientes = $('#tablaClientes');
        this.$inputBusqueda = $('#inputBusqueda');
        this.$formCliente = $('#formCliente');
        this.$modalCliente = $('#clienteModal');
        this.$modalConfirmacion = $('#confirmacionModal');
        this.$contadorClientes = $('#contadorClientes');
        this.$alertContainer = $('#alertContainer');
    }

    bindEvents() {
        $('#btnBuscar').click(() => this.buscarClientes());
        $('#btnAgregarCliente').click(() => this.prepararFormulario());
        $('#btnGuardar').click(() => this.guardarCliente());
        $('#btnConfirmarEliminar').click(() => this.eliminarCliente());

        this.$inputBusqueda.keypress((e) => {
            if (e.which === 13) this.buscarClientes();
        });

        this.$tablaClientes.on('click', '.btn-editar', (e) => {
            this.editarCliente($(e.currentTarget).data('id'));
        });

        this.$tablaClientes.on('click', '.btn-eliminar', (e) => {
            this.confirmarEliminacion($(e.currentTarget).data('id'));
        });
    }


    bindEvents() {
        $('#btnBuscar').click(() => this.buscarClientes());
        $('#btnAgregarCliente').click(() => this.prepararFormulario());
        $('#btnGuardar').click(() => this.guardarCliente());
        $('#btnConfirmarEliminar').click(() => this.eliminarCliente());

        this.$inputBusqueda.keypress((e) => {
            if (e.which === 13) this.buscarClientes();
        });

        this.$tablaClientes.on('click', '.btn-editar', (e) => {
            this.editarCliente($(e.currentTarget).data('id'));
        });

        this.$tablaClientes.on('click', '.btn-eliminar', (e) => {
            this.confirmarEliminacion($(e.currentTarget).data('id'));
        });
    }

    setupModalHandlers() {
        // Manejar el cierre del modal de cliente
        this.$modalCliente.on('hidden.bs.modal', () => {
            this.mostrarLoading(false);
            this.cargarClientes(); // Recargar lista al cancelar
        });

        // Manejar el cierre del modal de confirmación
        this.$modalConfirmacion.on('hidden.bs.modal', () => {
            this.mostrarLoading(false);
            // No recargamos aquí para evitar doble carga
        });
    }

    cargarClientes() {
        this.mostrarLoading(true);
        
        $.ajax({
            url: this.apiUrl,
            method: 'GET',
            dataType: 'json'
        })
        .done((data) => {
            this.mostrarClientes(data);
        })
        .fail((error) => {
            console.error('Error al cargar clientes:', error);
            this.mostrarError('Error al cargar clientes', error);
        })
        .always(() => {
            this.mostrarLoading(false);
        });
    }

    mostrarLoading(mostrar) {
        if (mostrar) {
            this.$tablaClientes.html(`
                <tr>
                    <td colspan="8" class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </td>
                </tr>
            `);
        } else if (this.$tablaClientes.find('.spinner-border').length) {
            this.$tablaClientes.empty();
        }
    }