import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const CreateNewTrainingModal = ({ open, columns, onClose, onSubmit, customers}) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {}),
    );
  
    const handleSubmit = () => {
      onSubmit(values);
      onClose();
    };

    const handleUserChange = (event) => {
      setValues({ ...values, customer: event.target.value.links[0].href})
    };

    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Training</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker 
                    label="Date and time" 
                     onChange={(e) =>
                      setValues({ ...values, date: e })
                    }
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  label='Duration'
                  name={'duration'}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value})
                  }
                />
                <TextField
                  label='Activity'
                  name={'activity'}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value})
                  }
                />
              <InputLabel id="demo-simple-select-filled-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={customers[0]}
                onChange={handleUserChange}>
                {customers.map((row) => (
                <MenuItem 
                  key={row.email} 
                  value={row}>
                  {`${row.firstname} ${row.lastname}`}
                </MenuItem>
                ))}
              </Select>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button color="error" onClick={onClose} variant="outlined">Cancel</Button>
          <Button color="success" onClick={handleSubmit} variant="contained">
            Create New Training
          </Button>
        </DialogActions>
      </Dialog>
    );
  };