'use client'
import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const Context = createContext({});

const TasksContext = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = typeof window !== 'undefined' ? localStorage.getItem('tasks') : {};
    return storedTasks ? JSON.parse(storedTasks) : {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Context.Provider value={[tasks, setTasks]}>
      {children}
    </Context.Provider>
  );
};

export default TasksContext;
