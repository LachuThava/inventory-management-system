
import React from 'react';
import login_pic from '../assets/login.png';
import LoginForm from './LoginForm';  
const Login = () => {

function goToSignup(){
  window.location.href='/signup';
}


  return (
    <div className='rounded-lg  '>
        <h1 className='ml-16  md:text-5xl m-auto text-center
          lg:text-6xl'>INVENTORY MANAGEMENT</h1>
        <div className=' flex p-4 justify-between mr-3 '>
            <div className='relative hidden lg:inline-grid'>
            <img src={login_pic} alt=""  
            className='h-auto '
            />
            </div>


            <div className=' shadow-md h-88 mr-16 m-auto p-2  relative'>
              <div className='relative left-32 top-10 lg:hidden rounded-md border-spacing-1 sm:inline-grid  w-36 h-36 '>
              <img src={login_pic} alt=""  
            className='h-auto '
            />
              </div>
                <LoginForm />
                <div className='mt-2 ml-5'>
                <span className=' mr-5'>You don't have account....</span>
                <text className='h-9 ml-3 cursor-pointer text-lg text-black underline ' onClick={goToSignup}>Sign up</text>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Login