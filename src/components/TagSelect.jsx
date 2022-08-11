import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

const tags = [
  { title: 'Health' },
  { title: 'Work' },
  { title: 'School' },
  { title: 'Life' },
  { title: 'Biology' },
  { title: 'Tech' },
]

/**
 * A component to display, select, and manage tags
 */
export default function TagSelect() {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0
  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const response = await fetch('/api/tags')
      if (active) {
        response.ok ? setOptions(response.json()) : setOptions([...tags])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      sx={{
        ml: 1,
        width: '30%',
      }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      options={options}
      getOptionLabel={(option) => option.title}
      loading={loading}
      // defaultValue={[tags[3]]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Tag"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
