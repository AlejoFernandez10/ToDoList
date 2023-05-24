'use client'
import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Context } from '@/context/TasksContext'



export default function CreateTaskModal( {state, activeDay }) {


  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useContext(Context)

  
  console.log(tasks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
    
  useEffect(()=>{

    const checkmodal = ()=>{
      if(state === true){
        setOpen(state)
      }
    }

    checkmodal()
  }, [state])


  const createTask = ()=>{
    const id = JSON.stringify(Math.random()).slice(2,12)
    const data = {id,activeDay, title, description}
    
    
    if(tasks[activeDay]){
     setTasks( tasks[activeDay].push(data))
    }
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#161d30]  text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form action="">

                <div className="bg-[#161d30] px-5 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-12 w-20 flex-shrink-0 items-center justify-center rounded-full   text-yellow-400">
                      New Task
                    </div>
                    <div className="mt-3  sm:ml-4 sm:mt-0 ">
                      
                      <div className="mt-2 flex flex-col gap-3">

                        <div>

                          <label htmlFor="title" className='text-sm text-gray-100'>Title:</label>
                          <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)}  className="text-sm  pl-3 w-full min-w-[250px] text-gray-300 border border-gray-400 rounded-[5px] py-1.5 bg-transparent"/>   
                        
                        </div>

                        <div>

                          <label htmlFor="desc" className='text-sm text-gray-100'>Description: </label>
                          <textarea name='desc' onChange={(e)=> setDescription(e.target.value)} className="text-sm w-full min-w-[250px] pl-3  text-gray-300 border border-gray-400 rounded-md py-1.5 bg-transparent"/>
                        
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#161d30] px-4 py-3 flex  sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center items-center rounded-md bg-white ring-gray-300 hover:bg-gray-50  px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={() => createTask() & setOpen(false)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md  px-3 py-2.5 text-sm font-semibold text-white shadow-sm   sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
