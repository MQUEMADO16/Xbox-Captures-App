import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getClips } from './services/apiService';

function App() {

  const handleOnClick = async () => {
    try {
      const clips = await getClips();
      console.log('Clips:', clips);
    } catch (error) {
      console.error('Error fetching clips:', error);
    }
  }

  return (
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
  );
}

export default App;
