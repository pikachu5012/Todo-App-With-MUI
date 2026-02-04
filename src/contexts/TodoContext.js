import React, { createContext, useContext, useState, useCallback } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoContextProvider');
  }
  return context;
};

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'test todo', dueDate: '2022-04-15T15:30', completed: false },
    { id: 2, title: 'test todo two', dueDate: '2022-04-15T15:30', completed: true },
    { id: 3, title: 'test todo three', dueDate: '2022-04-15T15:30', completed: false },
    { id: 4, title: 'test todo four', dueDate: '2022-04-15T15:30', completed: true },
  ]);

  const addTodo = useCallback((title, dueDate) => {
    if (!title || title.trim() === '') {
      throw new Error('Todo title is required');
    }

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      dueDate: dueDate || null,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id, title, dueDate) => {
    if (!id) {
      throw new Error('Todo ID is required');
    }
    if (!title || title.trim() === '') {
      throw new Error('Todo title is required');
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: title.trim(), dueDate: dueDate || null }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    if (!id) {
      throw new Error('Todo ID is required');
    }

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodoComplete = useCallback((id) => {
    if (!id) {
      throw new Error('Todo ID is required');
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const notificationCount = pendingTodos.length;

  const value = {
    todos,
    pendingTodos,
    completedTodos,
    notificationCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

