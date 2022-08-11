import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Alert, { setAlertOptions } from '../components/Alert'
import Search from '../components/Search'
import InnerRow from '../components/InnerRow'
import { styled } from '@mui/material/styles'
import { nanoid } from 'nanoid'
import { DateTime } from 'luxon'
import { calcElapsedDuration } from '../utils'

/**
 * A component for a single row in the Table component.
 * This represents a single task.
 * @param {Object} props The props object used to get/set the current task
 */
function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(row.name)
  const [periods, setPeriods] = useState(row.periods)
  const [recording, setRecording] = useState(false)
  const [editing, setEditing] = useState(false)
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }))
  const InnerRowMemoized = React.memo(InnerRow)

  // On initial load: Check if we should be recording the task
  // based on its last `end` entry
  const shouldRecord = () => {
    const last = row.periods.at(-1)
    return recording || last ? last.end === 0 : false
  }
  useEffect(() => {
    setRecording(shouldRecord())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Calculates a task's total elapsed time logged
   * @param {Object} task The task to calculate for
   * @returns {String} The total elapsed time logged
   */
  const calcElapsedText = (task) => {
    let d = calcElapsedDuration(task)

    return (
      (d.hours > 0 ? `${d.hours}h ` : '') +
      (d.minutes > 0 ? `${d.minutes}m ` : '') +
      (d.seconds > 0 ? `${d.seconds.toFixed(6).slice(0, -4)}s` : '')
    )
  }

  /**
   * Deletes the task
   */
  const handleDelete = () => {
    ;(async () => {
      const id = row._id
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const ok = response.ok
      const data = await response.json()
      // console.log('Deleting tasks', data)
      setAlertOptions({ open: true, ok_resp: ok, message: data.message })
      if (ok) {
        const res = props.tasks.filter((obj) => obj._id !== id)
        props.setTasks(res)
      }
    })()
  }

  /**
   * Updates the task to the database
   */
  const updateTask = (custom_msg) => {
    ;(async () => {
      const id = row._id
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(row),
      })
      const ok = response.ok
      const data = await response.json()
      // console.log('Updating tasks', data)
      setAlertOptions({ open: true, ok_resp: ok, message: custom_msg ? custom_msg : data.message })
    })()
  }

  /**
   * Saves the task with its current rendered properties
   */
  const handleSave = () => {
    // Currently editing. Since the button was pressed, we will save.
    if (editing) {
      const newTasks = props.tasks.map((task) => {
        if (task._id === row._id) {
          row.name = name
          row.periods = periods
          task.name = row.name
          task.periods = row.periods
        }
        return task
      })
      // update our local state
      props.setTasks(newTasks)
      // POST update task according to `row`'s data
      updateTask()
    }
    setEditing(!editing)
  }

  /**
   * Enters a starting or ending time for the current task
   */
  const handleRecording = () => {
    let now = Date.now()
    if (!recording) {
      row.periods.push({ start: now, end: 0 })
      updateTask('Successfully recorded task')
    } else {
      let last = row.periods.at(-1)
      if (last) {
        last.end = now
        updateTask('Successfully recorded task')
      } else {
        // unreachable
        setAlertOptions({ open: true, ok_resp: false, message: 'Error: Stopped recording on an empty entry!' })
      }
    }
    setRecording(!recording)
  }

  return (
    <React.Fragment>
      <TableRow
        key={row._id}
        sx={{
          '& > *': {
            borderBottom: 'unset',
          },
        }}
      >
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              border: '0px solid',
              borderRadius: 0,
              bgcolor: 'background.paper',
              color: 'text.secondary',
              mr: -12,
            }}
          >
            <IconButton
              title={editing ? 'Close' : 'Edit'}
              aria-label="edit task and tags"
              size="small"
              onClick={(e) => setEditing(!editing)}
            >
              {editing ? <CloseIcon /> : <EditOutlinedIcon />}
            </IconButton>

            {editing && (
              <>
                <IconButton title="Save changes" aria-label="save task changes" size="small" onClick={handleSave}>
                  <DoneIcon color="primary" />
                </IconButton>
                <IconButton title="Delete" aria-label="delete task" size="small" onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            )}

            {!editing && (
              <Tooltip arrow title={shouldRecord() ? 'Stop recording task' : 'Record task'} placement="top">
                <IconButton aria-label="record task" size="small" onClick={handleRecording}>
                  {shouldRecord() ? <StopCircleIcon color="error" /> : <RadioButtonCheckedIcon color="primary" />}
                </IconButton>
              </Tooltip>
            )}

            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            <Tooltip arrow title="Total elapsed time" placement="top">
              <Typography variant="overline" color="subtitle2">
                {row.periods.length > 0 ? calcElapsedText(row) : ''}
              </Typography>
            </Tooltip>
          </Box>
        </TableCell>
        <TableCell component="th" scope="row">
          <InputBase
            required
            multiline
            disabled={!editing}
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'black',
                cursor: 'auto',
              },
            }}
            color="primary"
          />
        </TableCell>

        <TableCell align="right">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              border: '0px solid',
              borderRadius: 1,
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {row.tags.map((data) => {
              return (
                <ListItem key={data.id}>
                  <Chip label={data.name} onDelete={editing ? () => {} : undefined} size="small" variant="outlined" />
                </ListItem>
              )
            })}
          </Box>
        </TableCell>
      </TableRow>

      {/* Inner table of periods */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right">Elapsed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.periods.map((period) => (
                    <TableRow key={nanoid()}>
                      <TableCell component="th" scope="row">
                        {DateTime.fromISO(row.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                      </TableCell>
                      {/* Start/end cell */}
                      {[true, false].map((start) => {
                        return (
                          <TableCell align={start ? 'left' : 'right'}>
                            {(start ? period.start : period.end) > 0 ? (
                              editing ? (
                                <InnerRowMemoized
                                  task={row}
                                  period={period}
                                  periods={periods}
                                  setPeriods={setPeriods}
                                  ptype={start ? 'start' : 'end'}
                                />
                              ) : (
                                DateTime.fromMillis(start ? period.start : period.end).toLocaleString(
                                  DateTime.TIME_WITH_SECONDS,
                                )
                              )
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        )
                      })}
                      <TableCell align="right">
                        {calcElapsedText({ periods: [{ start: period.start, end: period.end }] })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

/**
 * A component to render all tasks using a table
 * @param {Object} props The props object used to get/set the current task
 */
export default function CollapsibleTable(props) {
  const { tasks, setTasks } = props

  /**
   * Fetches tasks from the API and saves it to a local variable
   */
  const getTasks = async () => {
    const resp = await fetch('/api/tasks')
    if (resp.ok) {
      const data = await resp.json()
      if (data && JSON.stringify(data) !== JSON.stringify(tasks)) {
        // console.log('Getting tasks', data)
        setTasks(data)
      }
    }
  }

  useEffect(() => {
    ;(async () => await getTasks())()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContainer component={Paper}>
      <Alert />
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              <Search tasks={tasks} setTasks={setTasks} getTasks={getTasks} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" />
            <TableCell>Task</TableCell>
            <TableCell align="center">Tag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.length > 0 &&
            tasks.map((row) => <Row key={nanoid()} row={row} tasks={tasks} setTasks={setTasks} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
