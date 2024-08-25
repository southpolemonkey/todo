import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const { addTodo } = useTodos(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      addTodo({ text: todoText, completed: false })
      setTodoText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
