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