// src/services/api.js

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleResponse(res) {
  const text = await res.text().catch(() => "");
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || res.statusText || "Error en la petición";
    throw new Error(msg);
  }
  return data;
}

export async function getTodos() {
  return handleResponse(await fetch(`${API_BASE}/todos`));
}

export async function createTodo(payload) {
  return handleResponse(
    await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateTodo(id, payload) {
  return handleResponse(
    await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function deleteTodo(id) {
  return handleResponse(
    await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    })
  );
}
