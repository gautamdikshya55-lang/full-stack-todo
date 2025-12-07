import { API_URL } from "../config/api";

// Always read token directly from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// GET ALL TODOS
export async function getTodos() {
  const token = getToken();

  const res = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// ADD TODO
export async function addTodoAPI(data) {
  const token = getToken();

  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// UPDATE TODO
export async function updateTodoAPI(id, data) {
  const token = getToken();

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// DELETE TODO
export async function deleteTodoAPI(id) {
  const token = getToken();

  return fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
