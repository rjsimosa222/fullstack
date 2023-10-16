@extends('layouts.task')

@section('content')
<style>
    /* Estilos para hacer el scroll más delgado en la tabla responsiva */
    .table-responsive::-webkit-scrollbar {
        width: 8px;
    }

    .table-responsive::-webkit-scrollbar-thumb {
        background-color: #fff;
        border-radius: 4px;
    }

    .table-responsive::-webkit-scrollbar-thumb:hover {
        background-color: #fff;
    }
</style>

<div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="mb-0">Lista de Tareas</h2>
        <button class="btn btn-primary" id="registrarTareaBtn">Registrar Tarea</button>
    </div>
    <div class="table-responsive">
        <table class="table table-custom" id="taskTable">
            <thead>
                <tr>
                    <th width="2%">ID</th>
                    <th width="10%">Título</th>
                    <th width="20%">Descripción</th>
                    <th width="10%">Fecha de Creación</th>
                    <th width="8%">Estatus</th>
                    <th width="10%" id="btn-action">Acciones</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

@endsection
