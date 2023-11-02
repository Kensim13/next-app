import { tb_order } from '@prisma/client'
import React from 'react'
import { getAllOrders } from './prismaUtil/data'

const ViewOrder = async () => {
    const allOrders: tb_order[] = await getAllOrders();
    console.log(allOrders);
  return (
    <>
        <div>View All Orders</div>
        <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Item Name</th>
            <th>Pricing</th>
            <th>Order Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
            {allOrders.map(order => 
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item.name}</td>
                <td>${order.orderPrice.toFixed(2)} / {order.orderQtyPerUOM}{order.orderUom}</td>
                <td>{order.orderQty} {order.orderUom}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
              </tr>)}
        </tbody>
      </table>
    </>
    
  )
}

export default ViewOrder