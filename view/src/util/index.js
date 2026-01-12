const API_BASE = '/api';
export const createTodo = async (todo) => {
  const response = await fetch(`${API_BASE}/todo/create`, {
    method: 'POST',
    body: todo,
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  return response.json();
};
export const getTodos = async () => {
  const response = await fetch(`${API_BASE}/todos`);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
};
export const removeTodo = async (id) => {
  const response = await fetch(`${API_BASE}/todo/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }

  return response.json();
};