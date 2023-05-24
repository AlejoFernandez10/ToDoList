'use client'
import React, { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext({})

const TasksContext = ({children}) => {

  const [tasks, setTasks] = useState({
    Monday:[],
    Tuesday:[],
    Wednesday:[],
    Thursday:[],
    Friday:[],
    Saturday:[],
    Sunday:[],
  })


  return (
    <Context.Provider value={[tasks, setTasks]}>

      {children}

    </Context.Provider>
  )
}

export default TasksContext