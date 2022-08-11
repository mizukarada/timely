import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import { calcElapsedDuration } from '../utils'

/**
 * A component to display various charts for statistics purposes
 */
export default function Charts() {
  const [data, setData] = useState([])
  const [pieData, setPieData] = useState([])
  const nowStr = DateTime.now().toUTC().toISODate()

  /**
   * Populate chart data with data from the API
   */
  async function populateData() {
    const response = await fetch(`/api/tasks/date/${nowStr}`)
    const ok = response.ok
    const data = await response.json()
    if (ok && data) {
      let d = data.map((task) => {
        let duration = calcElapsedDuration(task)
        return {
          name: task.name,
          total_in_hours: duration.as('hours'),
          hours: duration.hours,
          minutes: duration.minutes,
          seconds: duration.seconds,
        }
      })
      setData(d)

      const durationsPeriods = data.map((task) => calcElapsedDuration(task))
      const res = durationsPeriods.reduce((prev, current) => prev.plus(current).normalize())

      const tracked = res.as('hours')
      setPieData([
        { name: 'Tasks', value: tracked },
        { name: 'Untracked', value: 24.0 - tracked },
      ])
    }
  }

  // Pie chart rendering information
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE']
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  useEffect(() => {
    ;(async () => await populateData())()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%', height: 300 }}>
      <center>
        <h3>for today</h3>
        <br />
      </center>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" stackId="a" fill="#b04f83" />
          <Bar dataKey="minutes" stackId="a" fill="#87ca9d" />
          <Bar dataKey="seconds" stackId="a" fill="#8884d8" />
          <Bar dataKey="total_in_hours" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
      <br />
      <br />
      <center>
        <Typography variant="h4">Overview</Typography>
        <Typography variant="body">of the hours spent in 24 hours</Typography>
      </center>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
