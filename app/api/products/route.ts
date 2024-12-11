import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Handling GET request (same as before)
// API to get medications with their associated medication names
export async function GET() {
  try {
    const medications = await prisma.medication.findMany({
      include: {
        medicationName: true,  // Fetch the associated medication name
      },
    });

    // Returning medications with the associated medication names
    return NextResponse.json({ medications });
  } catch (error) {
    console.error("Failed to load medications", error);
    return NextResponse.json({ error: "Failed to load medications" }, { status: 500 });
  }
}


// POST Request to add medication
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newMedication = await prisma.medication.create({
      data: {
        medicationNameId: body.medicationNameId, 
        scientificName: body.scientificName,
        ingredients: body.ingredients,
        category: body.category,
        type: body.type,
        warnings: body.warnings,
        sideEffects: body.sideEffects,
        batchCode: body.batchCode,
        arrivalDate: new Date(body.arrivalDate),
        expireDate: new Date(body.expireDate),
        supplierId: body.supplierId,
        amount: parseInt(body.quantity, 10),
        pricePerUnit: parseFloat(body.pricePerUnit),
        bestBeforeDate: new Date(body.bestBeforeDate),
        shelfAddress: body.shelfAddress,
        handlingInstructions: body.handlingInstructions,
      },
    });
    return NextResponse.json(newMedication);
  } catch (error) {
    console.error("Error Adding Medication", error);
    return NextResponse.json({ error: "Failed to add medication" }, { status: 500 });
  }
}

