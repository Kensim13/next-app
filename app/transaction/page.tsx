import React from 'react'
import AddOrder from '../components/Order/AddOrder/AddOrder'
import { tb_item } from '@prisma/client';
import { getAllItems } from '../components/Item/prismaUtil/data';

const Transaction = async () => {
  const allItems: tb_item[] = await getAllItems();
  const allItemsDecimaltoNumber = allItems.map((item) => ({
    ...item,
    price: Number(item.price)
  }));
  return (
    <>
      <div>New Order</div>
      <br></br>
      <br></br>
      <AddOrder listOfItems={allItemsDecimaltoNumber} />
    </>
  )
}

export default Transaction