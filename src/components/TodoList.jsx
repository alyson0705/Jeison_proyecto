// src/components/TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos = [], onToggle, onDelete, onEdit }) {
  if (!todos || todos.length === 0) return <p>No hay tareas aún.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
      {todos.map((t) => (
        <TodoItem key={t.id ?? t._id ?? t.created_at} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
