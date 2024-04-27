import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Outlet} from 'react-router-dom';
import { Avatar } from '@mui/material';
const Layout = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar>D</Avatar>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DATADOG Management System
          </Typography>
         
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout