import React, { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

/**
 * Normalizes numbers to be within 100 for easy percentage calculation
 * @param {Number} value The number to normalize
 * @param {Number} MIN Starting limit
 * @param {Number} MAX Ending limit
 * @returns Normalized calculation
 */
const normalise = (value, MIN, MAX) => ((value - MIN) * 100) / (MAX - MIN)

/**
 * A component to track the current progress of the day with a progressbar
 */
export default function DayProgress() {
  const createNowDt = () => ({
    now: Date.now(),
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date().setHours(23, 59, 59, 9999),
  })
  const [dt, setDt] = useState(createNowDt())

  useEffect(() => {
    let timer = setInterval(() => {
      setDt(createNowDt())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  return (
    <Tooltip
      followCursor
      arrow
      title={
        <React.Fragment>
          <Typography variant="body2" color="inherit">{`${Math.round(
            normalise(dt.now, dt.start, dt.end),
          )}% of the day elapsed`}</Typography>
        </React.Fragment>
      }
      placement="top"
    >
      <LinearProgress variant="determinate" size={10} thickness={14} value={normalise(dt.now, dt.start, dt.end)} />
    </Tooltip>
  )
}
