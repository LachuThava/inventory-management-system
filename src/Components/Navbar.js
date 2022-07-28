import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between  justify-center items-center shadow-sm'>
        <div>
            <h1>Inventory Management</h1>
        </div>
        <div className='w-2/5'>
            <ul className='flex justify-evenly -mr-10 mt-3'>
                <li>Home</li>
                <li>sign Out</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar