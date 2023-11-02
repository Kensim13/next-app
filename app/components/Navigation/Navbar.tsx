import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='navbar bg-accent'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>Jenny Fruit Shop</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <details>
              <summary>
                Inventory
              </summary>
              <ul className='p-2 bg-base-100'>
                <li>
                  <Link href="/inventoryManagement/viewItem">View</Link>
                </li>
                <li>
                  <Link href="/inventoryManagement/updateItem">Update</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                Transactions
              </summary>
              <ul className='p-2 bg-base-100'>
                <li>
                  <Link href="/transaction">New Order</Link>
                </li>
                <li>
                  <Link href="/transaction/viewTransaction">View All Orders</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar