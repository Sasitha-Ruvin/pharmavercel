import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function GET(request:Request,{params}:{params:{id:string}}) {
    try{
        const {id} = params;
        const clientId = parseInt(id);

        if(isNaN(clientId)){
            return NextResponse.json({error:'Invalid Client ID'},{status:400})

        }

        const client = await prisma.client.findUnique({
            where:{id:clientId}
        });

        if(!client){
            return NextResponse.json({error:'Client Not Found'},{status:404})
        }
        return NextResponse.json(client,{status:200})

    }catch(error){
        console.log(error);
        return NextResponse.json({error:'Failed to Fetch Clients'},{status:500})
    }
    
}

export async function PUT(request:Request, {params}:{params:{id:string}}) {
    try{
        const {id} = params;
        const clientId = parseInt(id);

    }catch(error){
        console.error(error);
    }
    
}