<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // Mostrar todas las tareas
    public function index()
    {
        $tasks = Task::where('status', 1)->get();
        return response()->json($tasks);
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
        $task = new Task([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'finish' => $request->input('finish'),
            'status' => $request->input('status'),
        ]);

        $task->save();

        return response()->json(['message' => 'Tarea creada correctamente', 'task' => $task]);
    }

    // Mostrar una tarea específica
    public function show($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }
        return response()->json($task);
    }

    // Actualizar una tarea
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $task->title = $request->input('title') != '' ? $request->input('title') : $task['title'];
        $task->finish = $request->input('finish') != '' ? $request->input('finish') : $task['finish'];
        $task->status = $request->input('status') != '' ? $request->input('status') : $task['status'];
        $task->description = $request->input('description') != '' ? $request->input('description') : $task['description'];
        $task->save();

        return response()->json(['message' => 'Tarea actualizada correctamente', 'task' => $task]);
    }

    // Eliminar una tarea
    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Tarea eliminada correctamente', 'task' => $task]);
    }
}
