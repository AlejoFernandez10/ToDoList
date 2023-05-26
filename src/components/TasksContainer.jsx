'use client'

import React, { useState, useContext} from 'react'


import CreateTaskModal from './CreateTaskModal'
import { Context } from '@/context/TasksContext'
import TasksCard from './TasksCard'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const weekDays = [
  'Monday', 
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]


const TasksContainer = () => {


  const [activeDay, setActiveDay] = useState('Monday')
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useContext(Context)
  
  
  const handleModalState = () =>{
    if(!open ){
      setOpen(true)     
    }
    setTimeout(()=>{
      setOpen(false)
    }, 100)
  }
  
  const data = new Date()

  const today = [data.getDate(), data.getMonth(), data.getFullYear()].join('/')
  


  return (
    <section className='min-h-screen flex flex-col w-full '>
      <h1 className='text-3xl pt-20 pb-10 pl-5'> Add your tasks </h1>

      <div className='flex flex-col gap-3'>
      <p className='flex items-center pr-3 self-end text-xs gap-3'>Today: <span className='text-sm'>{today} </span> </p>
      <div as="div" className=" sliders-container  rounded-2xl pl-5  flex flex-col justify-center text-left pt-5   w-full">
          <div className='w-full flex justify-between px-2'>
            <h2 className='mb-7'>Pick a day:</h2>

            

          </div>
      <div className='w-full flex  gap-5  overflow-x-scroll snap-mandatory '>

        <div className='flex snap-mandatory gap-3 ' >

        {weekDays.map((day)=>(

          
        <button key={day}  onClick={()=> setActiveDay(day) } className={`max-w-[200px]  ${activeDay === day ? 'bg-[#0F172A] text-yellow-500 ring-yellow-500'  : 'ring-gray-300'}  flex justify-center w-full min-w-[130px]   rounded-md bg-transparent px-3.5 py-2.5 text-base font-semibold text-white shadow-sm ring-1 ring-inset  `}>
          
          {day}
          
        </button>         

          ))}
        </div>

        
      </div>

    </div>
      <div className='w-full flex  justify-center gap-2 pt-6'>

        <button className='flex items-center gap-2' onClick={()=> handleModalState()} >
        <span className='text-4xl text-yellow-400'>+ </span><span className='self-center pt-1 text-lg'>Add task</span>       

          <CreateTaskModal state={open} activeDay={activeDay} />
        </button>
      </div>

          <div className='pl-3 pt-4'>
            <h4 className='text-xl pb-10'>Tasks Active</h4>

            <div className='w-full max-w-[600px] flex flex-col justify-center items-center gap-4 '> 
                {tasks[activeDay] &&

                  tasks[activeDay].map((task)=>(
                    <TasksCard key={task.id} id={task.id} activeDay={activeDay}  title={task.title} description={task.description} priority={task.priority} />
                  ))
                }
            </div>
          </div>

    
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </section>
  )
}

export default TasksContainer