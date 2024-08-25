import React from 'react';
import TodoItem from './TodoItem';
import useTodos from '../hooks/useTodos';

const TodoList = () => {
  const { todos, removeTodo } = useTodos();

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
