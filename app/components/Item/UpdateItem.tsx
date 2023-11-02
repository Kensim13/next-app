import React from 'react'
import { getAllItems } from './prismaUtil/data';
import { tb_item } from '@prisma/client';

const UpdateItem = async () => {
  const allItems: tb_item[] = await getAllItems();
  console.log(allItems);
  return (
    <>
      <div>Update or add new items to your inventory</div>
      <table className='table table-bordered'>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Unit of Measurement (UOM)</th>
                      <th>Qty Per UOM</th>
                      <th>Stock</th>
                  </tr>
              </thead>
              <tbody>
                  {allItems.map(item => 
                      <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.UOM}</td>
                          <td>{item.qtyPerUOM}</td>
                          <td>{item.stockBalance}</td>
                      </tr>)}
              </tbody>
          
      </table>
    </>
  )
}

export default UpdateItem