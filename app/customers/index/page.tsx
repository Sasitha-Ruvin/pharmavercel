'use client'
import React, { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import useClients from '@/app/hooks/useClients';
import SideBar from '@/components/SideBar';
import SearchBar from '@/components/SearchBar';
import ActionButton from '@/components/ui/ActionButton';
import Swal from 'sweetalert2';
import DataGridTable from '@/components/DataGridTable';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'contact', headerName: 'Contact', width: 100 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'tier', headerName: 'Tier', width: 80 },
  { field: 'contractType', headerName: 'Contract Type', width: 150 },
  { field: 'paymentMethod', headerName: 'Payment Method', width: 100 },
  { field: 'addresses', headerName: 'Addresses', width: 250 },
];

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    allClients,
    filteredClients,
    selectedClientId,
    setSelectedClientId,
    handleDeleteClient,
  } = useClients(searchQuery);

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='bg-[#F7F8FA] flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-2 text-black'>Manage Clients</h2>
        <p className='text-gray-500 mb-6'>Detailed View of Clients</p>

        <div className='flex justify-between items-center mb-4'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ActionButton label='Add Client' link='/customers/create' color='primary' variant='contained' />
        </div>

        <div style={{ height: 400, width: '100%' }}>
          <DataGridTable
            rows={filteredClients}
            columns={columns}
            onRowSelectionChange={setSelectedClientId}
          />
        </div>

        <div className='mt-4 flex flex-row gap-5'>
          <div className='flex gap-4'>
            <ActionButton label='Remove Client' onClick={handleDeleteClient} variant='outlined' color='error' />
            <ActionButton
              label='Update Client'
              onClick={() => {
                if (!selectedClientId) {
                  Swal.fire({
                    title: 'Error',
                    text: 'Select a Client to Update',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  });
                  return;
                }
                window.location.href = `/customers/update/${selectedClientId}`;
              }}
              variant='contained'
              color='primary'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
