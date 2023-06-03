'use client'

import React, { useState, useContext} from 'react'


import CreateTaskModal from './CreateTaskModal'
import { Context, ActiveDayContext } from '@/context/TasksContext'

import TasksCard from './TasksCard'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from './DataPickr'
import Filters from './Filters'


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
    <section className='min-h-screen  flex flex-col w-full max-w-[1300px] lg:items-start lg:justify-start lg:pb-20 lg:px-5'>
      <h1 className='text-xl pt-20 pb-10 pl-5 text-transparent' id='addtasks'> Add tasks! </h1>

      <div className='flex flex-col items-center justify-center  px-5 pb-4  pr-3 w-full  sm:flex-row  sm:justify-between text-xs gap-3 '>     

        <p className=' text-sm  sm:text-[21px] flex flex-col gap-2 sm:flex-row'><span className='text-xs sm:text-base text-gray-400     '>Active day: </span> {activeDay}</p>
        
        <DatePicker />
         
        <Filters />
      
      </div>
      
      <div className='flex flex-col w-full static min-h-[80vh] items-start gap-3 lg:flex-row'>
      <div as="div" className=" sliders-container   rounded-2xl pl-5  flex flex-col justify-start text-left pt-5   w-full lg:max-w-[220px] lg:pl-0">
        <div>
          <div className='w-full flex justify-between px-2 lg:pl-4'>
            <h2 className='mb-7'>This week:</h2>

            

          </div>

          <div>

      <div className='w-full flex  gap-5  overflow-x-scroll snap-mandatory lg:flex-col  lg:snap-none  lg:justify-start '>

        <div className='flex snap-mandatory  gap-3 lg:flex-col lg:snap-none  lg:justify-start lg:items-center lg:min-h-[370px]' >

        {weekDays.map((day) => (
            <div key={day} className='w-full flex justify-center  '>
              <button
                onClick={() => setActiveDay(day) & localStorage.clear()}
                className={`max-w-[180px] transition-all duration-200 hover:text-yellow-500 hover:ring-yellow-500  ${
                  activeDay === day ? 'bg-[#0F172A] text-yellow-500 ring-yellow-500' : 'ring-gray-300'
                }  flex justify-center w-full min-w-[100px]   rounded-md bg-transparent px-3 py-2.5 text-[14px] font-semibold text-gray-200 shadow-sm ring-1 ring-inset  `}
              >
                {day}
              </button>
            </div>
          ))}
        </div>

        </div>
          </div>

        
      </div>

    </div>

      <div className='w-full self-start flex   items-center justify-start gap-2  flex-col pt-14 '>

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
        autoClose={4000}
        limit={3}
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