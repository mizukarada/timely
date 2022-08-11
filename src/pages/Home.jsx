import React, { useState } from 'react'
import Greeting from '../components/Greeting'
import DayProgress from '../components/DayProgress'
import Task from '../components/Task'
import CollapsibleTable from '../components/CollapsibleTable'

/**
 * A component to render the Home page/route
 */
export default function Home() {
  const [tasks, setTasks] = useState([])
  return (
    <>
      <Greeting />
      <Task tasks={tasks} setTasks={setTasks} />
      <DayProgress />
      <CollapsibleTable tasks={tasks} setTasks={setTasks} />
    </>
  )
}
