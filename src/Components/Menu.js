import React from 'react'
import user from '../assets/user.png';
import lab_1 from '../assets/Lab1.png';
import lab_2 from '../assets/Lab2.png';
import logout from '../assets/logout.png';
import menu_bg from '../assets/Menubg.jpg';
import UserSettings from './UserSettings';
import { getAuth, signOut } from 'firebase/auth';
const Menu = () => {

    function handleSignOut(e){
        const auth = getAuth();
        signOut(auth)
        .then((res)=>{
          console.log("signout");
          window.location.href ="/";
        }).catch((err)=>{
          console.log(err.message);
        })
      }


      
function goToUserSettings(){
 window.location.href = '/Settings'; 
}


  return (
    <div className="h-screen  w-screen absolute">
        
        <h1 className='text-center  text-8xl text-violet-600'>Menu Page</h1>
        <div className='justify-center items-center row relative top-1/4 flex '>
            <div className=' cursor-pointer justify-center h-36 items-center text-center mb-5   col-lg-4 w-auto ml-3 col-md-6 col-sm-12' onClick={goToUserSettings}>
                <img className='h-40 w-42' src={user} alt="" />
                <span className='fw-bold'>User</span>
            </div>
            <div className='cursor-pointer justify-center items-center text-center mb-5  h-36 col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42' src={lab_1} alt="" />
                <span className='fw-bold'>LAB 01</span>
            </div>
            <div className=' cursor-pointer h-36 justify-center items-center text-center mb-5   col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42 ' src={lab_2} alt="" />
                <span className='fw-bold'>LAB 02</span>
            </div>
            <div className=' cursor-pointer h-36 justify-center items-center text-center mb-5  col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42' src={logout} onClick={handleSignOut} alt="" />
                <span className='fw-bold'>Log Out</span>
            </div>
        </div>
    </div>
  )
}

export default Menu