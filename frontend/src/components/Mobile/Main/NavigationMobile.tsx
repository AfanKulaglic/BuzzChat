import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WindowIcon from '@mui/icons-material/Window';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationMobileProps {
  onTabChange: (newValue: number) => void;
  activeTab: number;
}

export default function NavigationMobile({ onTabChange, activeTab }: NavigationMobileProps) {
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
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          background: '#2b2b2b',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<WindowIcon sx={{ fontSize: '25px', color: value === 0 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '15px',
              color: value === 0 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px',
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '15px', 
              },
            },
          }}
        />
        <BottomNavigationAction
          label="Explore"
          icon={<TravelExploreIcon sx={{ fontSize: '25px', color: value === 1 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '15px',
              color: value === 1 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px', 
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '15px', 
              },
            },
          }}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon sx={{ fontSize: '25px', color: value === 2 ? '#6559a2' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '15px',
              color: value === 2 ? '#6559a2' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px', 
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '15px',
              },
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
