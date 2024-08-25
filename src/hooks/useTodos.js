// src/hooks/useTodos.js
import { useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const user = auth.currentUser;
      if (!user) return [];

      const todosCollection = collection(db, 'todos', user.uid, 'userTodos');
      const todosSnapshot = await getDocs(todosCollection);
      const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosList);
    };

    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'todos', user.uid, 'userTodos'), newTodo);
    setTodos((prev) => [...prev, newTodo]);
    console.log(todos)
  };

  const removeTodo = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, 'todos', user.uid, 'userTodos', id));
    setTodos((prev) => prev.filter(todo => todo.id !== id));
    console.log(todos)
  };

  return { todos, addTodo, removeTodo };
};

export default useTodos;
