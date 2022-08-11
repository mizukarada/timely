import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Divider from '@mui/material/Divider'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Alert, { setAlertOptions } from '../components/Alert'

/**
 * A component to allow searching for a task
 * @param {Object} props The props object that contains task information and operations
 */
export default function Search(props) {
  const { setTasks } = props
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || (name && name.trim() === '')) {
      props.getTasks()
      return
    }
    ;(async () => {
      const response = await fetch(`/api/tasks/${name}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setAlertOptions({ open: true, ok_resp: response.ok, message: data.message })

      if (response.ok) {
        setTasks(data.tasks)
      }
    })()
    setName('')
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: `0px solid `,
        borderRadius: 1,
      }}
    >
      <Alert />
      <InputBase
        sx={{ flex: 1, width: '100%' }}
        placeholder="Search tasks"
        inputProps={{ 'aria-label': 'search tasks', pattern: '.*\\S.*' }}
        value={name}
        pattern=".*\S.*"
        onChange={(e) => setName(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <Tooltip arrow title="Filter by tag" placement="top">
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <FilterAltIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
