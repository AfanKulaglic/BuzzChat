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
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        borderRight:'0.1vh solid white',
        left: 0,
        height: '100%', // Make the navigation take up the full height of the screen
        width: '4vw', // Width of the vertical navigation
        display: 'flex',
        flexDirection: 'column', // Ensure the items are arranged vertically
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
          height: '100%', // Ensure navigation covers the full height of the container
          display: 'flex',
          flexDirection: 'column', // Make items stack vertically
          alignItems: 'center', // Center icons and labels
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
            minWidth: '0', // Prevent horizontal stretching
            padding: '20px 0', // Vertical padding
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
            minWidth: '0', // Prevent horizontal stretching
            padding: '20px 0', // Vertical padding
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
            minWidth: '0', // Prevent horizontal stretching
            padding: '20px 0', // Vertical padding
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
