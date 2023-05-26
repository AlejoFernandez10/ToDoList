'use client'
import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Context } from '@/context/TasksContext'
import { XMarkIcon,FlagIcon } from '@heroicons/react/24/outline'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const priorities =[
  'Priority 1',
  'Priority 2',
  'Priority 3',
]

export default function CreateTaskModal( {state, activeDay }) {


  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useContext(Context)
  const [priority, setPrioriy] = useState('P3')  
  
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
    const data = {id,activeDay, title, description, priority}
    
    if(title === '' || description === ''){

      toast.error('Complete all the fields to add a new task', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    }else{

      setTasks((current)=>{
  
        const newTasks = {...current}
        if(newTasks[activeDay]){
          newTasks[activeDay].push(data)
        }
  
        return newTasks
      })

      setTimeout(()=>{
          setOpen(false)
      }, 100)
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
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0  translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" h-auto   rounded-lg bg-[#161d30]  text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                

                <div className="bg-[#161d30] relative px-5 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-12 w-20 flex-shrink-0 items-center justify-center rounded-full   text-yellow-400">
                      New Task
                    </div>
                    <div className="mt-3  sm:ml-4 sm:mt-0 ">
                      
                      <div className="mt-2 flex flex-col gap-3 sm:gap-5">

                        <div>

                          
                          <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)} placeholder='Title'  className="text-base   pl-3 w-full min-w-[250px] text-gray-300 border border-gray-500  rounded-[5px] py-1.5 bg-transparent"/>   
                        
                        </div>

                        <div>

                          
                          <textarea name='desc' onChange={(e)=> setDescription(e.target.value)} placeholder='Description' className="text-sm w-full min-w-[250px] pl-3  text-gray-300 border border-gray-500  rounded-md py-1.5 bg-transparent"/>
                        
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#161d30]   px-4 py-3 flex w-full justify-between sm:px-6">

                <Menu as="div" className=" relative inline-block text-left">
                    <div>
                      <Menu.Button className=" inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-[13px] font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 ">
                        

                        {priority !== 'Priority' ?
                        <>
                          <span>{priority} </span>
                        <FlagIcon className={`h-5 w-5 ${priority === 'P1' && 'text-red-500'} ${priority === 'P2' && 'text-yellow-500'} ${priority === 'P3' && 'text-green-500'} `} />
                        </>
                        :
                        priority
                        }


                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items   className=" absolute left-0 mt-2 w-36  origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700">
                        <div className="py-1 ">


                          {priorities.map((pri)=>(

                          <Menu.Item key={pri}>
                            {({ active }) => (
                              <button
                                onClick={()=> setPrioriy(pri.slice(0,1) + pri.slice(9,10))}
                                className={classNames(
                                  active ? ' text-gray-200' : 'text-gray-200',
                                  'flex gap-2 px-4 py-2 text-[13px] '
                                )}
                              >
                                <FlagIcon className={`h-5 w-5 ${pri === 'Priority 1' && 'text-red-500'} ${pri === 'Priority 2' && 'text-yellow-500'} ${pri === 'Priority 3' && 'text-green-500'} `} />

                               {pri}
                              </button>
                            )}
                          </Menu.Item>
                          ))}                        
                         
                          
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="  justify-center items-center  w-auto rounded-md bg-white ring-gray-300 hover:bg-gray-50  px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={() => createTask() }
                  >
                    Add
                  </button>

                </div>
                  <button
                    type="button"
                    className="  items-center justify-center rounded-md   text-sm font-semibold text-white shadow-sm  absolute top-5 right-2   "
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    <XMarkIcon className='text-sm w-8 h-8   right-0' />
                  </button>

               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
