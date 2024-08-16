import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface NavigationMobileProps {
  onTabChange: (newValue: number) => void;
  activeTab: number;
}

export default function NavigationMobile({ onTabChange, activeTab }: NavigationMobileProps) {
  const [value, setValue] = React.useState(activeTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
          label="Recents"
          icon={<RestoreIcon sx={{ color: value === 0 ? 'purple' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '1.5vh',
              color: value === 0 ? 'purple' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px', // reset padding to prevent enlargement
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '1.5vh', // reset font size
              },
            },
          }}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon sx={{ color: value === 1 ? 'purple' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '1.5vh',
              color: value === 1 ? 'purple' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px', // reset padding to prevent enlargement
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '1.5vh', // reset font size
              },
            },
          }}
        />
        <BottomNavigationAction
          label="Nearby"
          icon={<LocationOnIcon sx={{ color: value === 2 ? 'purple' : 'white' }} />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '1.5vh',
              color: value === 2 ? 'purple' : 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              paddingTop: '6px', // reset padding to prevent enlargement
              '& .MuiBottomNavigationAction-iconOnly': {
                padding: '0px',
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '1.5vh', // reset font size
              },
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
