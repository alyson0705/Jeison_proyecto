// src/components/TodoItem.jsx
import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        padding: "10px",
        borderRadius: "6px",
        background: "#f3f3f3",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
        alignItems: "center"
      }}
    >
      <div>
        <strong style={{ textDecoration: todo.status === "completada" ? "line-through" : "none" }}>
          {todo.title}
        </strong>
        <div style={{ fontSize: "13px", color: "#555" }}>{todo.description}</div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => onToggle(todo.id)}>
          {todo.status === "completada" ? "↺" : "✓"}
        </button>
        <button onClick={() => onDelete(todo.id)}>🗑</button>
      </div>
    </li>
  );
}
