// src/components/TodoForm.jsx
import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    onAdd({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={submit}
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
      }}
    >
      <input
        placeholder="Título (obligatorio)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: "1 1 300px" }}
      />

      <input
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ flex: "2 1 300px" }}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}
