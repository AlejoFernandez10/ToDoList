import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/TasksContext';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const filtersArray = ['Random', 'High-Low Priority', 'Low-High Priority'];

const Filters = () => {

  const [tasks, setTasks] = useContext(Context);
  const [activeFilter, setActiveFilter] = useState('Random');

  useEffect(() => {
    const filterTasks = (filter) => {
      const updatedTasks = { ...tasks };

      if (filter === 'High-Low Priority') {

        for (const day in updatedTasks) {
          updatedTasks[day] = updatedTasks[day].sort((a, b) => {
            const priorityOrder = { P1: 1, P2: 2, P3: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        }
      } else if (filter === 'Low-High Priority') {
        for (const day in updatedTasks) {
          updatedTasks[day] = updatedTasks[day].sort((a, b) => {
            const priorityOrder = { P1: 1, P2: 2, P3: 3 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          });
        }
      }

      setTasks(updatedTasks);
    };

    filterTasks(activeFilter);
  }, [activeFilter, setTasks, tasks]);

  return (
    <Menu as="div" className="relative inline-block text-left md:pb-6">
      <div className=''>
        <label htmlFor="filters" className="text-sm pl-1">
          Filter:
        </label>
        <Menu.Button
          name={'filters'}
          className="inline-flex w-full sm:max-w-[250px] min-w-[210px] md:min-w-[165px] justify-between gap-x-1.5 rounded-md text-yellow-400 bg-[#051427] px-3 py-2 text-sm font-semibold text-yelow-400 shadow-sm ring-1 ring-inset ring-gray-500"
        >
          {activeFilter}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-yellow-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#051427] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filtersArray.map((filter) => (
              <Menu.Item key={filter}>
                {({ active }) => (
                  <button
                    onClick={() => setActiveFilter(filter)}
                    className={classNames(
                      'text-gray-100',
                      'block px-4 py-2 text-sm w-full text-left',
                      active && 'bg-[#0B253F]'
                    )}
                  >
                    {filter}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Filters;
