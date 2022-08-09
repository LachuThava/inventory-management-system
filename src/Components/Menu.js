import React, { useEffect, useState } from 'react'
import user from '../assets/user.png';
import lab_1 from '../assets/Lab1.png';
import lab_2 from '../assets/Lab2.png';
import chat from '../assets/chat.png';
import logout from '../assets/logout.png';

import report from '../assets/report.png';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
const Menu = () => {

// var [isBool,setIsBool] = useState(false);
// const[temp,setTemp] = useState();

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


function handleLab_1(){
  window.location.href='/Lab_1';
}

function handleLab_2(){
  window.location.href='/Lab_2';
}

function handleChat(){
  window.location.href='/chatting';
}


function handleReport(){
  window.location.href='/report';
}

// async function FindPosition(){
//     const uid = await auth.currentUser?.uid;
//     console.log("uid",uid);
//     const docRef = await doc(db,"Users",uid);
//     const docSnap = await getDoc(docRef);
//     setTemp(await docSnap.get('position'));
//     console.log("temp",temp);
//     console.log("temp!=='Student'",temp!=='Student');
//     if(temp!=='Student'){
//       setIsBool(true);
//       console.log("isBool",isBool);
//     }
// }


useEffect(()=>{
  // FindPosition();
},[]);

  return (
    <div className="h-screen  w-screen absolute">
        
        <h1 className='text-center  text-8xl text-violet-600'>Menu Page</h1>
        <div className='justify-center items-center row relative top-1/4 flex '>
            <div className=' cursor-pointer justify-center h-36 items-center text-center mb-5   col-lg-4 w-auto ml-3 col-md-6 col-sm-12' onClick={goToUserSettings}>
                <img className='h-36 w-42' src={user} alt="" />
                <span className='fw-bold'>User</span>
            </div>
            <div onClick={handleLab_1} className='cursor-pointer justify-center items-center text-center mb-5  h-36 col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42' src={lab_1} alt="" />
                <span className='fw-bold'>LAB 01</span>
            </div>
            <div onClick={handleLab_2} className=' cursor-pointer h-36 justify-center items-center text-center mb-5   col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42 ' src={lab_2} alt="" />
                <span className='fw-bold'>LAB 02</span>
            </div>
            <div onClick={handleChat} className=' cursor-pointer h-36 justify-center items-center text-center mb-5   col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42 ' src={chat} alt="" />
                <span className='fw-bold'>Chat</span>
            </div>
            {<div className=' cursor-pointer h-36 justify-center items-center text-center mb-5  col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42' src={report} onClick={handleReport} alt="" />
                <span className='fw-bold'>Report</span>
            </div>}
            <div className=' cursor-pointer h-36 justify-center items-center text-center mb-5  col-lg-4 w-auto ml-3 col-md-6 col-sm-12'>
                <img className='h-36 w-42' src={logout} onClick={handleSignOut} alt="" />
                <span className='fw-bold'>Log Out</span>
            </div>
        </div>
    </div>
  )
}

export default Menu