'use client'

import React, { useState, useContext} from 'react'


import CreateTaskModal from './CreateTaskModal'
import { Context, ActiveDayContext } from '@/context/TasksContext'

import TasksCard from './TasksCard'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from './DataPickr'


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


  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useContext(Context) 
  
  const [activeDay, setActiveDay] = useContext(ActiveDayContext)

  
  
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
    <section className='min-h-screen flex flex-col w-full max-w-[1300px] lg:items-start lg:justify-start lg:pb-20 lg:px-5'>
      <h1 className='text-3xl pt-20 pb-10 pl-5' id='addtasks'> Add your tasks </h1>

      <div className='flex items-center pr-3 self-end text-xs gap-3'><DatePicker /> </div>
      
      <div className='flex flex-col w-full items-center gap-3 lg:flex-row'>
      <div as="div" className=" sliders-container  rounded-2xl pl-5  flex flex-col justify-start text-left pt-5   w-full lg:max-w-[220px] lg:pl-0">
        <div>
          <div className='w-full flex justify-between px-2 lg:pl-4'>
            <h2 className='mb-7'>This week:</h2>

            

          </div>
      <div className='w-full flex  gap-5  overflow-x-scroll snap-mandatory lg:flex-col  lg:snap-none  lg:justify-start'>

        <div className='flex snap-mandatory  gap-3 lg:flex-col lg:snap-none lg:justify-start lg:items-center' >

        {weekDays.map((day) => (
            <div key={day} className='w-full flex justify-center'>
              <button
                onClick={() => setActiveDay(day)}
                className={`max-w-[200px]  ${
                  activeDay === day ? 'bg-[#0F172A] text-yellow-500 ring-yellow-500' : 'ring-gray-300'
                }  flex justify-center w-full min-w-[130px]   rounded-md bg-transparent px-3.5 py-2.5 text-base font-semibold text-gray-200 shadow-sm ring-1 ring-inset  `}
              >
                {day}
              </button>
            </div>
          ))}
        </div>

        </div>

        
      </div>

    </div>

      <div className='w-full self-start flex   items-center justify-start gap-2  flex-col pt-6 '>

          <div className=' justify-self-start'>

        <button className='flex items-center  gap-2' onClick={()=> handleModalState()} >
        <span className='text-4xl text-yellow-400'>+ </span><span className='self-center pt-1 text-lg'>Add task</span>       

          <CreateTaskModal state={open} activeDay={activeDay} />
        </button>
          </div>
          <div className='pl-3 pt-4 flex flex-col w-full items-center justify-center '>
            

            <div className='w-full  m-auto grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-2 lg:grid-cols-3  gap-4 '>
               
                {tasks[activeDay] &&

                  tasks[activeDay].map((task)=>(
                    <TasksCard key={task.id} id={task.id} activeDay={activeDay}  title={task.title} description={task.description} priority={task.priority} />
                  ))
                }


            </div>
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