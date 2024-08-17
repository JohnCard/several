import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  const [value, setValue] = React.useState(0);

  return (
    <>
      {/* main box container */}
      <Box sx={{ width: 500, marginTop: 2, marginBottom: 3, marginLeft: 5 }}>
        {/* bottom navigator */}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {/* bottom navigator actions (links) */}
          <BottomNavigationAction
            component={Link}
            to="/weather"
            label="Weather application" 
            icon={<AcUnitIcon />} 
          />
          <BottomNavigationAction
            component={Link}
            to="/movies"
            label="Loco for movies" 
            icon={<TheatersIcon />} 
          />
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Main" 
            icon={<TheatersIcon />} 
          />
          <BottomNavigationAction
            component={Link}
            to="/cities"
            label="cities" 
            icon={<TheatersIcon />} 
          />
        </BottomNavigation>
      </Box>
      <Outlet />
    </>
    
  );
}
