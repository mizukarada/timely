import React from 'react'
import Typography from '@mui/material/Typography'
import Charts from '../components/Charts'

/**
 * A component to render the Statistics page
 */
export default function Stats() {
  return (
    <>
      <center>
        <Typography variant="h1" component="div" gutterBottom>
          Statistics
        </Typography>
      </center>
      <Charts />
    </>
  )
}
