<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>FullStack</title>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.0.1/css/buttons.dataTables.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    </head>
    <body>

        <nav class="navbar navbar-dark bg-black">
            <div class="container">
                <span class="navbar-brand mb-0 h1 nameuser">Mi Aplicación</span>
                <button class="btn btn-light" onclick="signOff()">
                    <i class="bi bi-box-arrow-right"></i> Finalizar Sesión
                </button>
            </div>
        </nav>
        
        <div class="container">
            <div id="alertas"></div>

            @yield('content')
            
            <div class="modal fade" tabindex="-1" role="dialog" id="confirmDeleteModal" style="margin-top:24px">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title modal-title-1">Confirmar Eliminación</h5>
                        </div>
                        <div class="modal-body modal-body-1">
                            ¿Estás seguro de que deseas eliminar este registro?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="$('#confirmDeleteModal').modal('hide')">No</button>
                            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Si</button>
                            <button type="button" class="btn btn-danger" id="confirmDeleteBtnFin">Si</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-labelledby="editTaskModalLabel" aria-hidden="true" style="margin-top:25px">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editTaskModalLabel">Editar Tarea</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="$('#editTaskModal').modal('hide');">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="editTaskForm" novalidate>
                                <div class="form-group">
                                    <label for="editTitle">Título:</label>
                                    <input type="hidden" class="form-control" id="editTaskId" name="editTaskId">
                                    <input type="text" class="form-control" id="editTitle" name="editTitle" minlength="6" required>
                                    <div class="invalid-feedback">
                                        El título debe tener al menos 6 caracteres.
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="editDescription">Descripción:</label>
                                    <textarea class="form-control" id="editDescription" name="editDescription" minlength="6" required></textarea>
                                    <div class="invalid-feedback">
                                        La descripción debe tener al menos 6 caracteres.
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="editStatus">Estatus:</label>
                                    <select class="form-control" id="editStatus" name="editStatus" required>
                                        <option value="">Selecciona un estatus</option>
                                        <option value="1">En Progreso</option>
                                        <option value="0">Finalizado</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, selecciona un estatus.
                                    </div>
                                </div>
                                
                                <div class="form-group">&nbsp;</div>
                                <div class="form-group col-12 d-flex justify-content-center align-items-center">
                                    <button type="submit" class="btn btn-primary" id="btn-save-update">Guardar Cambios</button>
                                </div>    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js"></script>
        <script src="{{ asset('resources/js/sesion.js') }}"></script>
        <script src="{{ asset('resources/js/task.js') }}"></script>
    </body>
</html>