import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Typography } from '@mui/material';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
function NavBar() {

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <InsertDriveFileTwoToneIcon /> Docket
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
