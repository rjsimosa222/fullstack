var idFicticios = {}; // Objeto para mapear IDs ficticios a IDs reales
var contador = 1; // Contador para IDs ficticios
$(document).ready(function() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var tienePrivilegios = true;
    $('#btn-action').show();
    $('#registrarTareaBtn').show();
    if(userData.user.rol > 0) {
         tienePrivilegios = false;
         $('#btn-action').hide();
        $('#registrarTareaBtn').hide();
    }
    // Listado de tareas en datatable
    var table = $('#taskTable').DataTable({
       dom: 'Bfrtip',
        buttons: [
            'excel', 'csv'
        ],
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        ajax: {
            url: 'api/tasks',
            dataSrc: ''
        },
        columns: [
            { 
                data: null,
                render: function(data, type, row) {
                    // Asignar un ID ficticio si no existe un mapeo para el ID real
                    if (!idFicticios[row.id]) {
                        idFicticios[row.id] = contador;
                        contador++;
                    }
                    return idFicticios[row.id];
                }
            },
            {
                data: 'title',
                render: function(data, type, row) {
                    return data.charAt(0).toUpperCase() + data.slice(1);
                }
            },
            {
                data: 'description',
                render: function(data, type, row) {
                    return data.charAt(0).toUpperCase() + data.slice(1);
                }
            },
            {
                data: 'created_at',
                render: function(data, type, row) {
                    var fecha = new Date(data);
                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return fecha.toLocaleDateString(undefined, options);
                }
            },
            { 
                data: 'finish',
                render: function(data, type, row) {
                    var statusText = data === 1 ? 'En progreso' : 'Finalizado&nbsp;&nbsp;&nbsp;';
                    var statusClass = data === 1 ? 'btn btn-success' : 'btn btn-secondary disabled';
                    return '<span class="' + statusClass + ' finishBtn" data-id="' + row.id + '">' + statusText + '</span>';
                }
            },
            {
                data: null,
                visible: tienePrivilegios,
                render: function(data, type, row) {
                    if (row.finish === 1) {
                        return '<button class="btn btn-warning btn-sm editBtn" data-id="' + row.id + '" data-title="' + row.title + '" data-description="' + row.description + '" data-finish="' + row.finish + '" title="Editar"><i class="bi bi-pencil"></i> Editar</button>&nbsp;' +
                               '<button class="btn btn-danger btn-sm deleteBtn" data-id="' + row.id + '" title="eliminar"><i class="bi bi-trash"></i> Eliminar</button>';
                    } else {
                        return '<button class="btn btn-secondary btn-sm editBtn" data-id="' + row.id + '" disabled><i class="bi bi-pencil"></i> Editar</button>&nbsp;' +
                               '<button class="btn btn-secondary btn-sm deleteBtn" data-id="' + row.id + '" disabled><i class="bi bi-trash"></i> Eliminar</button>';
                    }
                }
            }
        ]
    });

    // Evento para el botón de eliminar
    $('#taskTable').on('click', '.deleteBtn', function() {
        $('#confirmDeleteModal').modal('show');
        var taskId = $(this).data('id');
        $('#confirmDeleteBtn').show();
        $('#confirmDeleteBtnFin').hide();
        $('.modal-title-1').text('Confirmar Eliminación');
        $('.modal-body-1').text('¿Estás seguro de que deseas eliminar este registro?');
        $('#confirmDeleteBtn').on('click', function() {
            $.ajax({
                url: 'api/tasks/' + taskId,
                method: 'DELETE',
                success: function(response) {
                    table.ajax.reload(); 
                    mostrarAlerta('La tarea ' + response.task.title.toUpperCase() + ' se ha eliminado correctamente.', 'success');
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    mostrarAlerta('Error: no se ha eliminado la tarea ' + response.task.title.toUpperCase() + '.', 'warning');
                }
            });
            $('#confirmDeleteModal').modal('hide');
        });
    });

    // Evento para el botón de finalizar
    $('#taskTable').on('click', '.finishBtn', function() {
        $('#confirmDeleteModal').modal('show');
        var taskId = $(this).data('id');
        $('#confirmDeleteBtn').hide();
        $('#confirmDeleteBtnFin').show();
        $('.modal-title-1').text('Confirmar finalización de la Tarea');
        $('.modal-body-1').text('¿Estás seguro de que deseas finalizar este registro?');
        $('#confirmDeleteBtnFin').on('click', function() {
            var updatedData = {
                finish: 0, 
                title: '',
                status: '',
                description: ''
            };
            
            $.ajax({
                url: 'api/tasks/' + taskId,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function(response) {
                    table.ajax.reload(); 
                    mostrarAlerta('La tarea ' + response.task.title.toUpperCase() + ' se ha finalizado correctamente.', 'success');
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    mostrarAlerta('Error: no se ha finalizar la tarea ' + response.task.title.toUpperCase() + '.', 'warning');
                }
            });
            $('#confirmDeleteModal').modal('hide');
        });
    });
    
    //Evento modal para visualizar los datos a editar de cada tarea
    $('#taskTable').on('click', '.editBtn', function() {
        $('#editTaskModal').modal('show');
        $('#btn-save-update').text('Guardar Cambios');
        var taskId = $(this).data('id');
        var title = $(this).data('title');
        var finish = $(this).data('finish');
        var description = $(this).data('description');
    
        // Asigna los valores al formulario de edición
        $('#editTaskId').val(taskId);
        $('#editTitle').val(title);
        $('#editStatus').val(finish);
        $('#editDescription').val(description);
    });
    

    // Evento 'submit' del formulario editar
    $('#editTaskForm').submit(function(event) {
        event.preventDefault();
        if (validarFormulario()) {
            var taskId=$('#editTaskId').val();
            var methods='POST';
            var  urls='api/tasks';
            if(taskId) {
                methods='PUT';
                urls='api/tasks/' + taskId;
            }
            
            var updatedData = {
                status: 1,
                title: $('#editTitle').val(),
                finish: $('#editStatus').val(), 
                description: $('#editDescription').val()
            };
            
            $.ajax({
                url: urls,
                method: methods,
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: function(response) {
                    table.ajax.reload(); 
                    $('#editTaskModal').modal('hide');
                    limpiarFormulario('editTaskForm');
                    mostrarAlerta('La tarea ' + response.task.title.toUpperCase() + ' se ha guardado correctamente.', 'success');
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    mostrarAlerta('Error: no se ha guardado la tarea ' + response.task.title.toUpperCase() + '.', 'warning');
                }
            });
        }
    });

    // Evento 'change' del campo de estado
    $('#editStatus').on('change', function() {
        validarFormulario();
    });

    // Evento para levantar el modal de registro y limpiarlos datos
    $('#registrarTareaBtn').on('click', function() {
        $('#editTaskModal').modal('show');
        $('#btn-save-update').text('Guardar Registro');
        limpiarFormulario('editTaskForm');
    });
    
    //Funcion que muestra mensaje de conformidad de la accion eliminar o finalizar
    function mostrarAlerta(mensaje, tipo) {
        var alerta = '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert"><strong>' +
                        mensaje +
                     '</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    
        $('#alertas').html(alerta);
        setTimeout(function() {
            $('.alert').alert('close');
        }, 15000);
    }

    // Función para validar el formulario
    function validarFormulario() {
        var title = $('#editTitle').val();
        var description = $('#editDescription').val();
        var status = $('#editStatus').val();

        if (title.length < 6) {
            $('#editTitle').removeClass('is-valid').addClass('is-invalid');
        } else {
            $('#editTitle').removeClass('is-invalid').addClass('is-valid');
        }
        if (status === "") {
            $('#editStatus').removeClass('is-valid').addClass('is-invalid');
        } else {
            $('#editStatus').removeClass('is-invalid').addClass('is-valid');
        }
        if (description.length < 6) {
            $('#editDescription').removeClass('is-valid').addClass('is-invalid');
        } else {
            $('#editDescription').removeClass('is-invalid').addClass('is-valid');
        }
        // Devolver true si el formulario es válido, de lo contrario, false
        return (title.length >= 6 && description.length >= 6 && status !== "");
    }

    // Funcion para limpiar los campos del formulario cuando edito o registro
    function limpiarFormulario(formularioId) {
        var formulario = document.getElementById(formularioId);
        Array.from(formulario.elements).forEach(function(elemento) {
            if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA' || elemento.tagName === 'SELECT') {
                elemento.value = '';
                elemento.classList.remove('is-valid', 'is-invalid');
            }
        });
    }
});
