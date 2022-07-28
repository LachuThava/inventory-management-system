import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import signup from '../assets/signup.png';
import { auth,db } from '../firebase';
import { UserCredential } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc
  }  from 'firebase/firestore';
  import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
  import { createUserWithEmailAndPassword ,sendEmailVerification} from 'firebase/auth';

export const Signup = () => {

  const[name,setName] = useState();
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const[position,setPosition] = useState();
  const[department,setDepartment] = useState();
  const[emailError,setEmailError] = useState("");


  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };




  const  createUser = async (e) => {
    console.log("working");
    e.preventDefault(); 
    if(email.split("@")[1]==="eng.jfn.ac.lk")
    {
        setEmailError(<h6 className='text-green-500'>valid email address</h6>)
        await createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCredential) =>{
        const uid =   auth.currentUser?.uid;
        console.log("uid "+uid);
      



  await sendEmailVerification(userCredential.user);
      
  let docRef = doc(db,`Users/${uid}`);
  try {
  await setDoc(docRef, 
    {
      "name" : name,
      "uid ": uid,
      "email":email,
      "position":position,
      "createdTime" : serverTimestamp()
    }
    );


    if(position==='Student'){
      let docRef = doc(db,`students/${uid}`);
      try{
        await setDoc(docRef,
          {
            "name":name,
            "department":department,
            "email":email,
            "uid":uid
          })
      }catch(e){
      console.log(e.message);       
      }
    }

    try{
      let docRef_1= doc(db,`roles/${uid}`); 
    await setDoc(docRef_1,
      {
        "uid":uid,
        "role":position 
      })
    }catch(e){
      console.log("create role database");
      console.log(e.message);
    }

alert("congratulations you successfully created your account :)")

} catch (error) {
  console.log(error);
}
      

        
      
    
      }).catch((err)=>{
        console.log(err.message);
      })
      window.location.href = '/'; 
    }else{
      setEmailError(<h6 className='text-red-500'>invalid email address</h6>);
    }
    
  }


  function handleName(event){
    
    setName(event.target.value);
  }

  function handleEmail(event){
     
    setEmail(event.target.value);

    
  }

  function handlePosition(event){
    setPosition(event.target.value);
  }

  function handlePassword(event){
    setPassword(event.target.value);
  }

  function handleDepartment(event){
    setDepartment(event.target.value);
  }





  return (
    <div className='justify-around w-screen  p-2 flex relative'>
      <div>
        <img  className='h-screen hidden lg:inline-grid' src={signup} alt="" />
      </div>
      {/* form div */}
      <div className='relative flex-col m-auto h-1/2 w-96'>
        {/* sign up text */}
        <h1 className='text-center'>Sign Up</h1>
        {/* image */}
        <div className='lg:hidden relative sm:inline-flex '>
          <img src={signup} className=' h-44 w-48 sm:ml-28' alt="" />
        </div>
          {/* form */}
          
            
          <Form className='p-4  lg:ml-20 ' onSubmit={createUser}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleName} />
            <Form.Label>Email</Form.Label>
            <Form.Control  type="text" value={email} onChange={handleEmail}/>
            {emailError}
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePassword}/>
            <Form.Label className='mt-3'>Your position</Form.Label>
            <Form.Select onChange={handlePosition} className='mt-1'>
              <option value="Lecturer">Lecturer</option>
              <option value="Technical Officer">Technical Officer</option>
              <option value="HOD">HOD</option>
              <option value="Student">Student</option>
            </Form.Select>
            <Form.Label className='mt-3'>Department</Form.Label>
            <Form.Select onChange={handleDepartment} className='mt-1'>
              <option value="Civil">Civil</option>
              <option value="EEE">EEE</option>
              <option value="CSE">CSE</option>
              <option value="Mechanical">Mechanical</option>
            </Form.Select>
            <Button type='submit' className='mt-3'>Create Account</Button>
          </Form>
          
        </div>
    </div>
  );
}
export default Signup;