// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadTodos() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "No se pudo cargar las tareas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleAdd(todo) {
    // validación mínima
    if (!todo.title || !todo.title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setError(null);
    try {
      const created = await createTodo({ ...todo, status: "pendiente" });
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message || "No se pudo crear la tarea");
    }
  }

  async function handleToggleComplete(id) {
    const t = todos.find((x) => x.id === id);
    if (!t) return;
    try {
      const updated = await updateTodo(id, { ...t, status: t.status === "completada" ? "pendiente" : "completada" });
      setTodos((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.message || "No se pudo actualizar la tarea");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "No se pudo eliminar la tarea");
    }
  }

  return (
    <main>
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      {loading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <TodoList todos={todos} onToggle={handleToggleComplete} onDelete={handleDelete} />}
    </main>
  );
}

