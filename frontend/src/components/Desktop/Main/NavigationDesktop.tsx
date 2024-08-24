import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WindowIcon from '@mui/icons-material/Window';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationDesktopProps {
  onTabChange: (newValue: number) => void;
  activeTab: number;
}

export default function NavigationDesktop({ onTabChange, activeTab }: NavigationDesktopProps) {
  const [value, setValue] = React.useState(activeTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        borderRight:'0.1vh solid white',
        left: 0,
        height: '100%', 
        width: '4vw', 
        display: 'flex',
        flexDirection: 'column', 
        zIndex: 1000,
        background: '#2b2b2b',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          background: 'transparent',
          width: '100%',
          height: '100%', 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<WindowIcon sx={{ fontSize: '25px', color: value === 0 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '18px',
              color: value === 0 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
            },
            minWidth: '0', 
            padding: '20px 0', 
          }}
        />
        <BottomNavigationAction
          label="Explore"
          icon={<TravelExploreIcon sx={{ fontSize: '25px', color: value === 1 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '18px',
              color: value === 1 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
            },
            minWidth: '0', 
            padding: '20px 0', 
          }}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon sx={{ fontSize: '25px', color: value === 2 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '18px',
              color: value === 2 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
            },
            minWidth: '0', 
            padding: '20px 0', 
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
