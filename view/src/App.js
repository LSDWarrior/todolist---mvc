import React, { useEffect, useState } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({ description: '' });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodoList(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('description', todo.description);

      await createTodo(formData);

      setTodo({ description: '' });
      fetchTodos();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      fetchTodos();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        />
        <button type="submit">Add Todo</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => handleDelete(todoItem.todo_id)}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;

