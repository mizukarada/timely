import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { DateTime } from 'luxon'

/**
 * The component used for rendering individual time periods in a table
 * @param {Object} props Props containing various period inforation
 */
export default function InnerRow(props) {
  const { periods, period, ptype } = props
  let ptime = ptype === 'start' ? period.start : period.end
  const [value, setValue] = useState(DateTime.fromMillis(ptime).toLocaleString(DateTime.TIME_24_WITH_SECONDS))

  function handleChange(e) {
    e.preventDefault()
    const val = e.target.value
    setValue(val)
    const dt = DateTime.fromISO(val)
    const res = DateTime.fromMillis(ptime).set({ hour: dt.hour, minute: dt.minute, second: dt.second }).toMillis()
    // update local state. Our parent housing this `InnerRow` compnonent will save the entire task list
    // and commit it to the database
    periods.forEach((p) => {
      if (p._id === period._id) {
        ptype === 'start' ? (p.start = res) : (p.end = res)
      }
      return p
    })
  }

  return (
    <TextField
      type="time"
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 1,
      }}
      sx={{ width: 170 }}
    />
  )
}
