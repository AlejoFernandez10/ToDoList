import React from 'react'

const TasksCard = ({id, title, description}) => {
  return (
    <div className='bg-gray-700 max-w-[200px] w-full flex flex-col'>
      <h3>{title}</h3>
      <p>{description} </p>
    </div>
  )
}

export default TasksCard