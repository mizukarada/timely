import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Link from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'

const breadcrumbNameMap = {
  '/': 'Home',
  '/stats': 'Statistics',
  '/docs': 'Documentation',
  '/sources': 'Sources',
}

/**
 * A component to display the navbar
 */
export default function Navbar() {
  const location = useLocation()
  const routes = Object.entries(breadcrumbNameMap).map(([key, value]) => {
    return (
      <Link
        key={key}
        component={RouterLink}
        underline="hover"
        color={location.pathname === key ? 'text.primary' : 'inherit'}
        to={key}
      >
        {value}
      </Link>
    )
  })
  return (
    <Breadcrumbs
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 2.5, m: 0, width: '100%' }}
      aria-label="breadcrumb"
      className="nav"
    >
      {routes}
    </Breadcrumbs>
  )
}
