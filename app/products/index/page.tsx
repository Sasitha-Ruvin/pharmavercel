"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SideBar from "@/components/SideBar";
import SearchBar from "@/components/SearchBar";
import DataGridTable from "@/components/DataGridTable";
import ActionButton from "@/components/ui/ActionButton";
import useMedications from "@/app/hooks/useMedication";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 80 },
  { field: "scientificName", headerName:"Scientific Name", width:80},
  { field: "batchcode", headerName: "Batch Code", width: 80 },
  { field: "expiration", headerName: "Expiration", width: 80 },
  { field: "arrival", headerName: "Arrival", width: 80 },
  { field: "quantity", headerName: "Quantity", width: 80 },
  { field: "directions", headerName: "Instructions", width: 80 },
  { field: "ingredients", headerName: "ingredients", width: 80 },
  { field: "warning", headerName: "Warnings", width: 80 },
  { field: "price", headerName: "Price Per Unit", width: 80 },
  { field: "sideEffect", headerName: "Side Effects", width: 80 },
  { field: "supplierId", headerName: "Supplier ID", width: 80 },
  { field: "shelf", headerName: "Shelf", width: 80 },
  { field: "storetemp", headerName: "Store Temperature", width: 80 },
];


export const ProductForm = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const [rows, setRows] = useState<GridRowsProp>([]);
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  
  const{
    allMedications,
    filteredMedications,
    selectedMedicationId,
    setSelectedMedicationId,
    handleDelete
      }= useMedications(searchQuery)
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
        <SideBar />
      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Manage Medications</h2>
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex gap-4">
            <ActionButton label='Add Product' link='/products/create' variant='contained' color='primary'/>
            <ActionButton label="Add Medication Name" link="/medications/create" variant="contained" color="primary"/>
          </div>
        </div>

        <div style={{ height: 400, width: "100%",}}>
          <DataGridTable
            rows={filteredMedications}
            columns={columns}
            onRowSelectionChange={setSelectedMedicationId}
          />
        </div>

        <div className="mt-4">
          <div className="flex gap-4">
            <ActionButton label='Remove Product' onClick={handleDelete} variant='outlined' color='error' />
            <ActionButton label='Update Product' link='/products/update' variant='contained' color='primary'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
