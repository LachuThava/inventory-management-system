import React from 'react';
import { Button } from 'react-bootstrap';
import chat from '../assets/chat.png';

const UserSettings = () => {
  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='border-l-sky-400 border-l-2 border-r-2 border-r-pink-500 flex p-2 rounded-md h-2/3 w-2/5'>
      <div className='m-auto w-96 relative'>
          <img src={chat} className=' mb-3 h-28 w-32 rounded-circle m-auto h-full ' alt="" />
          
          <div className=' flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>Email :</span>
            <text>tlaksman932@gmail.com</text>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>password :</span>
            <text>tlaksman932@gmail.com</text>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>position : </span>
            <text>Student</text>
          </div>
          <div className='ml-36'>
            <Button className=''>Logout</Button>
          </div>
      </div>
    </div>
    </div>
  )
}

export default UserSettings