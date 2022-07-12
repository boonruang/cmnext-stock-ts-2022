import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '@/components/Layouts/Header'
import Menu from '@/components/Layouts/Menu'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} onDrawerOpen={() => setOpen(true)} />
      <Menu open={open} onDrawerClose={() => setOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
