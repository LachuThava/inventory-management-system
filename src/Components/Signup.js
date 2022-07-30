  import React, { useState } from 'react';
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/esm/Button';
  import signup from '../assets/signup.png';
  import { auth,db } from '../firebase';
  import { UserCredential } from 'firebase/auth';
  import {doc,serverTimestamp,setDoc}  from 'firebase/firestore';
  import { createUserWithEmailAndPassword ,sendEmailVerification} from 'firebase/auth';

  export const Signup = () => {

    var array = [];
    const[name,setName] = useState();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const[position,setPosition] = useState("Student");
    const[department,setDepartment] = useState("Civil");
    const[emailError,setEmailError] = useState();
    var [emailErrorBoolean,setEmailErrorBoolean] = useState(false);
    
    var emailPattern = new RegExp("[0-9{4}e0-9{3}]{8}");
    
   

    const  createUser = async (e) => {
      console.log("working");
      e.preventDefault(); 
      
         
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
                } catch (error) {
                  console.log(error);
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
                  
                  alert(`${email}, ${password}, ${position}, ${department}`);
                  alert("congratulations you successfully created your account :)")
                  
                  
                  
                  
                    }).catch((err)=>{
                      console.log(err.message);
                    })
                    window.location.href = '/'; 
      
      
    }


    var  position_options = [
              {
                'id':0,
                'pos_name':'Student'
              },
              
    ]

    var option_1 = [
      {
        "id":0,
        "pos_name":"Lecturer"
      },
      {
        "id":1,
        "pos_name":"Technical Officer"
      },
      {
        "id":2,
        "pos_name":"HOD"
      },
    ];

    var [arr,setArr] = useState([]);

   


      var vertify = (e) =>{
        e.preventDefault(); 
        var user_email_name = email.split("@")[0];
        console.log("user email name ",user_email_name);
        console.log(emailPattern.test(user_email_name));
        setArr(array);
        if(email.split("@")[1]==="eng.jfn.ac.lk"){ 
            setEmailError(<h6 className='text-green-400'>valid email address</h6>);
            setEmailErrorBoolean(true);

            console.log("after pop : ",array);
            if(emailPattern.test(user_email_name)===true){
              console.log("working student"); 
              position_options.map(item=>{
                setArr((prev)=>[...prev,
                  item
                  ])
              })
            }else{
              console.log("working HOD")
              option_1.forEach((item)=>{
                setArr((prev)=> [...prev,
                item
                ])
              })
            }
        }else{
          setEmailError(<h6 className='text-red-500'>invalid email address</h6>)
          setEmailErrorBoolean(false);
        }
        console.log('Array  :: ',array);
        // position_options  = Array.from(array);
        
        
        while (array.length) {
          array.pop();
      }
      
        console.log("array after pop : ",array);
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

     var depart = [
      {
        'id':0,
        'dep_name':'Civil'
      },
      {
        'id':1,
        'dep_name':'EEE'
      },
      {
        'id':2,
        'dep_name':'CSE'
      },{
        'id':3,
        'dep_name':'Mechanical'
      }

    ]




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
            
              
            <Form className='p-4  lg:ml-20 ' onSubmit={vertify} >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={handleName} />
                  <Form.Label>Email</Form.Label>
                  <Form.Control id='email'  type="email" value={email} onChange={handleEmail}/>
                  {emailError}
              <button className=' p-1 w-20 rounded-md mt-3 bg-green-600' type='submit'>vertify</button>
            </Form>
            {emailErrorBoolean && 
            <Form className="p-4  lg:ml-20" onSubmit={createUser}>
            <Form.Label className='mt-3'>Your position</Form.Label>
                <Form.Select size='lg' value={position}  onChange={handlePosition} className='mt-1'>
                  {
                    arr.map(item => {
                      return (<option key={item.id} value={item.pos_name}>{item.pos_name}</option>);
                  })
                  }
                </Form.Select>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePassword}/>
              <Form.Label className='mt-3'>Department</Form.Label>
              <Form.Select  value={department} onChange={handleDepartment} className='mt-1'>
                
                {depart.map(item => {
      return (<option key={item.id} value={item.dep_name}>{item.dep_name}</option>);
  })}
              </Form.Select>
              <Button type='submit' className='mt-3'>Create Account</Button>
            </Form>}
          </div>
      </div>
    );
  }
  export default Signup;