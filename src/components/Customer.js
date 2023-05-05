import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from './CustomerTable';

const Customer = () => {
  
  const [customers, setCustomers] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
  }

  const handleCreateNewRow = (values) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      customers.push(data);
      setCustomers([...customers]);
    })
    .catch(error => console.error(error))
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('firstname')} ${row.getValue('lastname')} (${row.getValue('email')})`)
      ) {
        return;
      }
      fetch(row.original.links[0].href, {
        method: 'DELETE'
      })
      .then((response) => {
        if(response.status === 204){
          customers.splice(row.index, 1);
          setCustomers([...customers]);
          alert("Deletion succesful!");
        }
        else{
          alert("Deletion failed!");
        }
      })
    },
    [customers],
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

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      fetch(row.original.links[0].href, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(response => response.json())
      .then(data => {
        customers[row.index] = data;
        setCustomers([...customers]);
      })
      .catch(error => console.error(error))
      exitEditingMode(); 
    }
  };

  const columns = useMemo (() => [
      {
        accessorKey: 'firstname',
        header: 'First Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'lastname',
        header: 'Last Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'streetaddress',
        header: 'Street',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'postcode',
        header: 'Postcode',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'city',
        header: 'City',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <Table
      columns={columns}
      tableData={customers} 
      handleCancelRowEdits={handleCancelRowEdits} 
      handleSaveRowEdits={handleSaveRowEdits} 
      handleDeleteRow={handleDeleteRow} 
      setCreateModalOpen={setCreateModalOpen} 
      createModalOpen={createModalOpen} 
      handleCreateNewRow={handleCreateNewRow}
    />
  )
};

export default Customer;
