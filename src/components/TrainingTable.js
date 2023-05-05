import React from 'react'
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CreateNewTrainingModal } from './CreateNewTrainingModal';


export default function Table({columns, tableData, handleDeleteRow, setCreateModalOpen, createModalOpen, handleCreateNewRow, customers}) {
  return (
    <>
    <MaterialReactTable
      displayColumnDefOptions={{'mrt-row-actions': { muiTableHeadCellProps: { align: 'center'}, size: 120,},}}
      columns={columns}
      data={tableData}
      editingMode="modal"
      enableColumnOrdering
      enableEditing
      enablePagination={false}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => setCreateModalOpen(true)} variant="contained">Create new Training</Button>
      )}
    />
    <CreateNewTrainingModal
      customers={customers}
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateNewRow}
    />
  </>
);
};
