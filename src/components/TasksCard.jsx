'use client'
import React, { useState, useContext } from 'react'
import {FiEdit} from 'react-icons/fi'
import {BsTrash} from 'react-icons/bs'
import { Context } from '@/context/TasksContext'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const TasksCard = ({id, title, description, priority, activeDay}) => {

  const [tasks, setTasks] = useContext(Context)


    
  
  const [titleValue, setTitleValue] = useState(title)
  const [descriptionValue, setDescriptionValue] = useState(description)

  const [activeEdit, setActiveEdit] = useState(false)

  const deleteTask = (id) => {

    
    setTasks((currentTasks) => {
      const updatedTasks = { ...currentTasks };
      if(updatedTasks) {
        
        updatedTasks[activeDay] = updatedTasks[activeDay].filter((task) => task.id !== id);
      }
      return updatedTasks;
    });

    toast.success('Task deleted!', {
      position: "top-right",
      autoClose: 2000,      
      closeOnClick: true,
      hideProgressBar:true,
      pauseOnHover: true,
      draggable: true,      
      theme: "dark",
      });

  };


  
  const throwToast = ()=>{

    if(titleValue != title){

      toast.success('Task modified correctly!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

  }
  
  const maxWidthTitle = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  return (
    <section className='bg-gray-700 task-card  w-[93%] max-w-[400px] lg:max-w-[450px] lg:w-[99%]  flex flex-col py-4 px-5 rounded-xl gap-2'>

      <div className='w-full flex justify-between gap-2'>
        {activeEdit ?
            <input type="text" value={titleValue}  onChange={(e)=> setTitleValue(e.target.value)} className={`bg-transparent w-[99%] border-[1px] py-1 text-lg border-gray-600 rounded-md  px-2`} />
        :
        
        <h3 className='text-lg font-semibold py-1 px-2'> {maxWidthTitle(titleValue !== title ? titleValue : title, 12)}</h3>
        }


        
        <div className='flex gap-2 items-center '>

        <FiEdit className='text-[20px] cursor-pointer text-yellow-400 transition-all duration-200 hover:text-yellow-700' onClick={(()=> setActiveEdit(true))}/>

        <span
          className={`flex  items-center justify-center rounded-full ${priority === 'P2' && 'bg-yellow-100 text-yellow-700'} ${priority === 'P1' && 'bg-red-100 text-red-700'} ${priority === 'P3' && 'bg-emerald-100 text-emerald-700'} px-2.5 py-0.5 `}
        >
          
           
          <p className="whitespace-nowrap font-semibold text-xs ">{priority} </p>
        </span>
      
        </div>

      </div>
      {activeEdit ?
      <div className='flex flex-col w-full pt-5 '>
            <input type="text" value={descriptionValue}  onChange={(e)=> setDescriptionValue(e.target.value)} className={`bg-transparent border-[1px] py-1 text-sm border-gray-600 rounded-md  px-2`} />
            <button className='self-end text-[13px] py-1 px-2 bg-white text-gray-800 mt-2 rounded-md    ' onClick={()=>setActiveEdit(false) & throwToast() }>Save</button>
      </div>
            : 
            <div className='flex w-full pt-5 justify-between items-center '>
              <p className='text-sm text-gray-300 py-1 px-2'>{description !== descriptionValue ? descriptionValue : description} </p>
              <BsTrash onClick={()=> deleteTask(id)} className='text-red-500 cursor-pointer transition-all text-[17px] duration-200 hover:text-red-700' />
            </div>
      } 
    </section>
  )
}

export default TasksCard