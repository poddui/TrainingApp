import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function ExportButton() {
  const handleClick = async () => {

    const confirmed = window.confirm('Are you sure you want to download user data as CSV-file?');
    if (!confirmed) {
      return;
    }
    const response = await axios.get('https://traineeapp.azurewebsites.net/api/customers');
    const users = response.data.content;

    const filteredUsers = users.map(user => ({
      firstname: user.firstname,
      lastname: user.lastname,
      streetaddress: user.streetaddress,
      postcode: user.postcode,
      city: user.city,
      email: user.email,
      phone: user.phone
    }));

    const csvData = filteredUsers.map(user => `${user.firstname},${user.lastname},${user.streetaddress},${user.postcode},${user.city},${user.email},${user.phone}`).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.csv';

    link.click();
  };

  return (
    <Button onClick={handleClick} color="warning" variant="contained">Download User Data</Button>
  );
}
export default ExportButton;