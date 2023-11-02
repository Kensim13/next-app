import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// POST to add orders, return http response status 200 when success and 500 when failed
export async function POST(req: any){
  try {
    const newOrders = await req.json();
    const createdOrders = await prisma.tb_order.createMany({ data: newOrders });
    return NextResponse.json(createdOrders, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Failed"}, {status: 500});
  }
}