import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import signup from '../assets/signup.png';

export const Signup = () => {

  const[name,setName] = useState();
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();

  function handleName(event){
    setName(event.target.value);
  }

  function handleEmail(event){
    setEmail(event.target.value);
  }

  function handlePassword(event){
    setPassword(event.target.value);
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
          <Form className='p-4  lg:ml-20'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleName} />
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={email} onChange={handleEmail}/>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePassword}/>
            <Form.Label className='mt-3'>Your position</Form.Label>
            <Form.Select className='mt-1'>
              <option>Lecturer</option>
              <option>Technical Officer</option>
              <option>HOD</option>
              <option>Student</option>
            </Form.Select>
            <Button className='mt-3'>Create Account</Button>
          </Form>
        </div>
    </div>
  );
}
export default Signup;