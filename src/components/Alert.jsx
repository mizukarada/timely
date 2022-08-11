import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

/**
 * Base Alert component
 */
const Alert2 = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
let setSnackbarOpts_

/**
 * A helper function to close the snackbar if it's already showing
 */
export function setAlertOptions(params) {
  setSnackbarOpts_({ ...params, open: false })
  setSnackbarOpts_(params)
}

/**
 * A component to show notifications on the sucess of an operation using a snackbar
 */
export default function Alert() {
  const [snackbarOpts, setSnackbarOpts] = React.useState({ open: false, ok_resp: true, message: 'init' })
  setSnackbarOpts_ = setSnackbarOpts
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpts({ ...snackbarOpts, open: false })
  }
  return (
    <Snackbar
      open={snackbarOpts.open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert2 onClose={handleClose} severity={snackbarOpts.ok_resp ? 'success' : 'error'} sx={{ width: '100%' }}>
        {snackbarOpts.message}
      </Alert2>
    </Snackbar>
  )
}
