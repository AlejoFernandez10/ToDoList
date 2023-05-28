'use client'
import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const Context = createContext({});
export const ActiveDayContext = createContext('')
const TasksContext = ({ children }) => {

  const [activeDay, setActiveDay] = useState('Monday')
  
  const [tasks, setTasks] = useState(() => {
    
    const storedTasks = typeof window !== 'undefined' ? localStorage.getItem('tasks') : null;
    try {
      return storedTasks ? JSON.parse(storedTasks) : {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
    } catch (error) {
      console.error('Error parsing stored tasks:', error);
      return {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Context.Provider value={[tasks, setTasks]}>
      <ActiveDayContext.Provider value={[activeDay, setActiveDay]}>

      {children}
      </ActiveDayContext.Provider>
    </Context.Provider>
  );
};

export default TasksContext;
