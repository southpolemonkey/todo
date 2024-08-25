import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import styles from '../styles/Home.module.css';
import Register from '../components/Register';
import Login from '../components/Login';
import { logoutUser } from '../utils/auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  // const [todos, setTodos] = useState([]);

  // const addTodo = (text) => {
  //   const newTodo = { id: Date.now(), text };
  //   setTodos([...todos, newTodo]);
  // };

  // const removeTodo = (id) => {
  //   setTodos(todos.filter(todo => todo.id !== id));
  // };


  return (
    <div>
      <h1>Todo List</h1>
      {!user ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <>
          <AddTodo />
          <TodoList />
          <button onClick={() => logoutUser()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
