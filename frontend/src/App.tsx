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
        <source src='https://gameclipscontent-d2001.media.xboxlive.com/xuid-2535440521101728-private/828e6f2f-dcd5-41ee-ac74-f265d272e6e2.MP4?sv=2017-11-09&sr=b&si=DefaultAccess&sig=47DqTIj4tCiL1W2vY6B5zhz%2FyPvZMntFs%2BK5ztzcmqk%3D&__gda__=1708985618_4fe8d6aac3f8d4dba4478b01537deb9f' type='video/mp4'></source>
      </video>
    </div>
    
  );
}

export default App;
