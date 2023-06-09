'use client'

import React, { useEffect, useRef, useState, useContext } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");
import { ActiveDayContext, Context } from '@/context/TasksContext';
import {AiOutlineCalendar} from 'react-icons/ai'


const DatePicker = () => {
  const datePickerRef = useRef(null);  
   const [tasks, setTasks] = useContext(Context)

  const [dateSelected, setDateSelected] = useState()

  const [activeDay, setActiveDay] = useContext(ActiveDayContext)
  
  
  useEffect(() => {
    flatpickr(datePickerRef.current, {
      minDate: "today",
      altInput: true,
      altFormat: "F j, Y",  
      dateFormat: "Y-m-d",

      

      onChange: (selectedDates) => {
        const date = [selectedDates[0].getDate(), (selectedDates[0].getMonth() + 1), selectedDates[0].getFullYear()].join('/')
        
        setDateSelected(date || null);
        
          setTasks((current) =>{

            const updatedTasks = { ...current };

            if (!updatedTasks[date]) {
              updatedTasks[date] = [];
            }
        
            return updatedTasks;
          })

          setActiveDay(date)
          
      },
    });


  }, []);


  
  
  

  return (
    
    <div className='flex flex-col pb-[22px] sm:pt-5 md:pt-0 '>
    <label htmlFor="dataPickr" className='text-sm'>Date:</label>
    <input type="text" ref={datePickerRef}
      name='dataPickr'      
          
      className='bg-transparent border border-gray-500 px-3 py-1.5 rounded-lg text-base w-full max-w-[300px] sm:max-w-[220px] text-white' data-input /> 
    
    </div>
     

   
      
   
  );
};

export default DatePicker;

    