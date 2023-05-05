import React from 'react'
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { CreateNewAccountModal } from './CreateNewAccountModal';
import ExportButton from './ExportButton';


export default function Table({columns, tableData, handleCancelRowEdits, handleSaveRowEdits, handleDeleteRow, setCreateModalOpen, createModalOpen, handleCreateNewRow}) {
  return (
    <>
    <MaterialReactTable
      displayColumnDefOptions={{
        'mrt-row-actions': {
          muiTableHeadCellProps: {
            align: 'center',
          },
          size: 120,
        },
      }}
      columns={columns}
      data={tableData}
      editingMode="modal"
      enableColumnOrdering
      enableEditing
      enablePagination={false}
      onEditingRowSave={handleSaveRowEdits}
      onEditingRowCancel={handleCancelRowEdits}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton color="primary" onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      
      renderTopToolbarCustomActions={() => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <Button onClick={() => setCreateModalOpen(true)} variant="contained">Create New Customer</Button>
          <ExportButton/>
        </div>
      )}
    />
    <CreateNewAccountModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateNewRow}
    />
  </>
);
};
