import prisma from "@/prisma/client";
import { tb_order } from "@prisma/client";

export async function getAllOrders(){
    const allOrders: tb_order[] = await prisma.tb_order.findMany({
        include: {
            item: {
                select: {
                    name: true,
                }
            }
        }
    });
    return allOrders;
}

export async function addNewOrders(newOrders: any) {
    try{
        const createdOrders = await prisma.tb_order.createMany({
            data: newOrders,
        });
        console.log('Orders added successfully:', createdOrders);
    } catch(error) {
        console.error('Error adding orders:', error);
    }
}