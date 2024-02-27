import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getClips } from './services/ApiService';
import { useState } from 'react';

function App() {

  const [testClip, setTestClip] = useState(''); // Default value is empty string, src takes nothing

  const handleOnClick = async () => {
    try {
      const clips = await getClips();
      console.log('Clips:', clips);
    } catch (error) {
      console.error('Error fetching clips:', error);
    }

    
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button variant='text' color='inherit' onClick={handleOnClick}>
              Test API
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PhrogChair
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <video controls width='500'>
        <source src={testClip}></source>
      </video>
    </div>
    
  );
}

export default App;
