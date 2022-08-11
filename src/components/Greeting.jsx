import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'

/**
 * The greeting component displays a clock and subtitle
 */
export default function Greeting() {
  const getCurrentTime = () => DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
  const [current, setCurrent] = useState(getCurrentTime())

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrent(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  return (
    <>
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
        variant="h1"
        component="div"
      >
        {current}
      </Typography>
      <Typography
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
        variant="subtitle1"
        component="div"
        gutterBottom
      >
        What are you going to work on today?
      </Typography>
    </>
  )
}
