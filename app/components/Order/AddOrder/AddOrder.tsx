'use client';
import React, { useState } from 'react'
import axios from 'axios';
import { timeOutDuration } from '@/app/config';

type Item = {
    id: number;
    name: string;
    price: number;
    UOM: string;
    qtyPerUOM: number;
    stockBalance: number;
}

type ItemComponentProps = {
    listOfItems: Item[]
}

function AddOrder({listOfItems}: ItemComponentProps)  {
    const [showOrderConfirmed, setShowOrderConfirmed] = useState(false);
    const [orders, setOrders] = useState<
        {
            itemId: number;
            orderQty: number,
            orderUom: string,
            orderQtyPerUOM: number,
            orderPrice: number,
            totalPrice: number;
        }[]
    >([]);

    const[receivedValue, setReceivedValue] = useState<number>();
    const[changeValue, setChangeValue] = useState<number>();
    
    const handleQuantityChange = (index: number, quantity: number) => {
        const updatedOrders = [...orders];
        const item = listOfItems[index];
        updatedOrders[index] = {
            itemId: item.id,
            orderQty: quantity,
            orderUom: item.UOM,
            orderQtyPerUOM: item.qtyPerUOM,
            orderPrice: item.price,
            totalPrice: calculateItemTotalPrice(item, quantity),
        };
        setOrders(updatedOrders);
    };

    const handleReceivedAndChange = (received: number) => {
        console.log('Received:', receivedValue, 'Total Order Price:', totalOrderPrice);
        setChangeValue(received - totalOrderPrice);
        console.log('Change value:', changeValue);
    };
    
    const calculateItemTotalPrice = (item: Item, quantity: number) => {
        console.log('Item Price:', item.price, 'and', 'Quantity:', quantity, 'Qty Per UOM:', item.qtyPerUOM);
        return Number((item.price * (quantity / item.qtyPerUOM)).toFixed(2));
    };
    
    const filteredOrders = orders.filter((order) => order?.totalPrice !== undefined && order.orderQty != 0);
    console.log(filteredOrders);
    const totalOrderPrice = filteredOrders.reduce((total, order) => total + order.totalPrice, 0);

    const submitOrders = async () => {
        const ordersToSubmit = orders.filter((order) => order?.totalPrice !== undefined && order.totalPrice != 0);
        console.log(ordersToSubmit);
        if(!ordersToSubmit || !ordersToSubmit.length){
            return;
        }
        try{
            const response = await axios.post('/components/Order/AddOrder/api', ordersToSubmit);
            if(response.status === 200){
                setShowOrderConfirmed(true);
                setTimeout(() => {
                    window.location.reload();
                }, timeOutDuration);
            }
        } catch (error) {
            console.log(error);
            setShowOrderConfirmed(false);
        }
    };

    

    if (!listOfItems || !listOfItems.length) {
        return (
            <div>
                No items available.
            </div>
        );
    }
      
    return (
        <>
        <div>Add Order</div>
        <table className='table'>
            <thead>
                <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {listOfItems.map((item: Item, index: number) => (
                    <tr className='hover' key={item.id}>
                        <td>{item.name}</td>
                        <td>${Number(item.price).toFixed(2)} / {item.qtyPerUOM}{item.UOM}</td>
                        <td>
                            <input
                                className='input input-bordered w-full max-w-xs'
                                type='text'
                                value={orders[index]?.orderQty || 0}
                                onChange={(e) => {
                                        if(!isNaN(parseInt(e.target.value))){
                                            handleQuantityChange(index, parseInt(e.target.value));        
                                        }
                                    }
                                }
                            />
                        </td>
                        <td>${orders[index]?.totalPrice.toFixed(2) || 0}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Total:</td>
                    <td>${totalOrderPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan={3}>Received:</td>
                    <td>$
                    <input
                        className='input input-bordered w-full max-w-xs'
                        type="number"
                        value={receivedValue}
                        onChange={(e) => {
                                if(!isNaN(parseFloat(e.target.value))){
                                    handleReceivedAndChange(parseFloat(e.target.value));
                                }
                        }}
                    />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>Change:</td>
                    <td>${changeValue?.toFixed(2) || 0}</td>
                </tr>
            </tfoot>
        </table>
        <button className='btn btn-primary' onClick={submitOrders}>Submit Orders</button>
        {showOrderConfirmed && (
        <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Your purchase has been confirmed!</span>
        </div>
        )}
        </>
    )
}

export default AddOrder