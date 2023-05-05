import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from './TrainingTable';

const Training = () => {
  
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [training, setTraining] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTraining(data));
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
  }
       
  const handleCreateNewRow = (values) => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      fetch(data.links[2].href)
      .then(response => response.json())
      .then(data2 => {
        training.push({...data, customer:{firstname: data2.firstname, lastname: data2.lastname}});
        setTraining([...training]);
      })
    })
    .catch(error => console.error(error))
  };

  const handleDeleteRow = useCallback(
    (row) => {
      console.log(row)
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('activity')} ${row.getValue('date').toLocaleDateString('de-DE')} ${row.getValue('customer.firstname')} ${row.getValue('customer.lastname')}`)
      ) {
        return;
      }
      fetch(`https://traineeapp.azurewebsites.net/api/trainings/${row.original.id}`, {
        method: 'DELETE'
      })
      .then((response) => {
        if(response.status === 204){
          training.splice(row.index, 1);
          setTraining([...training]);
          alert("Training deleted succesfully!");
        }
        else{
          alert("Training deletion failed!");
        }
      })
    },
    [training],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const validateRequired = (value) => !!value.length;

  const columns = useMemo (() => [
      {
        accessorFn: (date) => new Date(date.date),
        accessorKey: 'date',
        header: 'Date',
        size: 140,
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString('de-DE', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
        size: 140,
        Cell: ({ cell }) => cell.getValue()?.toString() + " min",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'activity',
        header: 'Program',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
      },
      {
        accessorKey: 'customer.firstname',
        header: 'First name',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'customer.lastname',
        header: 'Last name',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <Table
      customers={customers}
      columns={columns}
      tableData={training} 
      handleDeleteRow={handleDeleteRow} 
      setCreateModalOpen={setCreateModalOpen} 
      createModalOpen={createModalOpen} 
      handleCreateNewRow={handleCreateNewRow}
      />
  )
};

export default Training;
