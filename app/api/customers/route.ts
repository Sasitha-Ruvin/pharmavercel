import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            where: { isDeleted: false },
            include: { clientaddress: true },
        });

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error Fetching Clients:', error);
        return NextResponse.json({ error: 'Failed to fetch Clients' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
      const data = await request.json();
  
      // Create the client first
      const newClient = await prisma.client.create({
        data: {
          name: data.name,
          type: data.type,
          email: data.email,
          contact: data.contact,
          contractType: data.contractType,
          paymentMethod: data.paymentMethod,
          tier: data.tier,
        },
      });
  
      const clientAddresses = await prisma.clientaddress.createMany({
        data: data.addresses.map((address: string) => ({
          clientId: newClient.id,
          address,
        })),
      });
  
      return NextResponse.json({ client: newClient, addresses: clientAddresses }, { status: 201 });
    } catch (error) {
      console.error('Error creating client:', error);
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
  }