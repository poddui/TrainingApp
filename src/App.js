import React, { useState } from 'react';
import Customer from './components/Customer';
import Training from './components/Training';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import { Typography } from '@mui/material';

function App() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={<Typography fontWeight="bold">Customer list</Typography>} />
        <Tab label={<Typography fontWeight="bold">Trainings list</Typography>} />
        <Tab label={<Typography fontWeight="bold">Calendar</Typography>} />
        <Tab label={<Typography fontWeight="bold">Training Statistics</Typography>} />
      </Tabs>
        {value === 0 && <Customer />}
        {value === 1 && <Training />}
        {value === 2 && <Calendar />}
        {value === 3 && <Statistics />}
    </Box>
  );
}

export default App;
