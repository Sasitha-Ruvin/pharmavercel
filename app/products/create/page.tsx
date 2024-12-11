"use client"

import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import Swal from 'sweetalert2';
import SideBar from '@/components/SideBar';

export const Medications = () => {
  const router = useRouter();
  const [medicationNames, setMedicationNames] = useState<{ id: string; name: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);  // For suppliers dropdown
  const [formData, setFormData] = useState({
    medicationNameId: "",
    scientificName: "",
    ingredients: "",
    category: "",
    type: "",
    warnings: "",
    sideEffects: "",
    batchCode: "",
    arrivalDate: "",
    expireDate: "",
    supplierId: "", 
    quantity: "",
    pricePerUnit: "",
    bestBeforeDate: "",
    shelfAddress: "",
    handlingInstructions: "",
    storetemp:"",
  });

  useEffect(() => {
    // Fetch medication names from the database
    const fetchMedicationNames = async () => {
      const response = await fetch('/api/medicationname');
      const data = await response.json();
      setMedicationNames(data);
    };

    // Fetch suppliers from the database
    const fetchSuppliers = async () => {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    };

    fetchMedicationNames();
    fetchSuppliers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire('Success', 'Medication Added', 'success');
        router.push('/products/index');
      } else {
        Swal.fire('Error', 'Failed to Add Medication', 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="w-3/4 p-8 bg-gray-50 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-black">Add Medication</h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Medication Name Dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Medication Name</InputLabel>
            <Select
              name="medicationNameId"
              value={formData.medicationNameId}
              onChange={handleSelectChange}
              label="Medication Name"
            >
              {medicationNames.map(medication => (
                <MenuItem key={medication.id} value={medication.id}>
                  {medication.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Supplier Dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Supplier</InputLabel>
            <Select
              name="supplierId"
              value={formData.supplierId}
              onChange={handleSelectChange}
              label="Supplier"
            >
              {suppliers.map(supplier => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Other Form Fields */}
          <TextField
            label="Scientific Name"
            name="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Warnings"
            name="warnings"
            value={formData.warnings}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Side Effects"
            name="sideEffects"
            value={formData.sideEffects}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Batch Code"
            name="batchCode"
            value={formData.batchCode}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Arrival Date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
            fullWidth
          />
          <TextField
            label="Expiration Date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
            fullWidth
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Price Per Unit"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Best Before Date"
            name="bestBeforeDate"
            value={formData.bestBeforeDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date"
            fullWidth
          />
          <TextField
            label="Shelf Address"
            name="shelfAddress"
            value={formData.shelfAddress}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Handling Instructions"
            name="handlingInstructions"
            value={formData.handlingInstructions}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Store Temperature"
            name="storetemp"
            value={formData.storetemp}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <div className="col-span-2 flex justify-start mt-4 text-lg">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Medications;
