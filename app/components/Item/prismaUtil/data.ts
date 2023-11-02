import prisma from "@/prisma/client";

// find and return all items
export async function getAllItems() {
    const allItems = await prisma.tb_item.findMany();
    return allItems;    
}