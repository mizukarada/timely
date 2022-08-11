import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import Divider from '@mui/material/Divider'
import TagSelect from '../components/TagSelect'
import Alert, { setAlertOptions } from '../components/Alert'

export default function Task(props) {
  const { tasks, setTasks } = props
  const [name, setName] = useState('')

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    ;(async () => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      })
      const data = await response.json()
      setAlertOptions({ open: response.ok, ok_resp: response.ok, message: data.message })

      if (response.ok && tasks) {
        setTasks([...tasks, data.task])
      }
    })()
    setName('')
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 5 }}
      onSubmit={handleSubmit}
    >
      <Alert />
      <InputBase
        required
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter a task"
        inputProps={{ 'aria-label': 'enter a task', pattern: '.*\\S.*' }}
        value={name}
        onChange={handleChange}
        autoComplete="off"
      />

      <IconButton type="submit" sx={{ p: '10px' }} aria-label="create">
        <CreateIcon />
      </IconButton>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      {/* Tag Select */}

      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="tag">
                    <TagIcon />
                </IconButton> */}
      <TagSelect />

      {/* <div>
                <TextField id="outlined-search" label="Enter a task" type="search" />
                <TextField id="outlined-search" label="tag" type="search" />
            </div> */}
      {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
      {/* </FormControl> */}
    </Paper>
  )
}
