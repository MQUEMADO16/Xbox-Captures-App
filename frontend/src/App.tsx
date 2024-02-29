import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getClips } from './services/apiService';
import { useState } from 'react';

function App() {

  const [testClip, setTestClip] = useState('');

  const handleOnClick = async () => {
    try {

      const response = await getClips();
      const clips = response.values;
      console.log(clips); 
      const videoURI = clips[0].contentLocators[0].uri;
      setTestClip(videoURI);

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
      <video key={testClip} controls>
        <source src={testClip}/>
      </video>
    </div>
  );
}

export default App;
