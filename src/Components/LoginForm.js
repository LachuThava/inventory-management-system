import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {

    

    const handleSignIn = (e) => {
        e.preventDefault(); 
      signInWithEmailAndPassword(auth,email,password)
      .then((res)=>{
        if(auth.currentUser.emailVerified){
          console.log(res);
          window.location.href="/menu";
        }
        else{
            console.log("confirm message");
            alert('confirm your email vertification link');
        }
      }).catch((err)=>{
          console.log(err.message);
      })
    }
 
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
 

    function submitEmail(event){
        setEmail(event.target.value);
    }

    function submitPassword(event){
        setPassword(event.target.value);
    }
    

    return (
        <form onSubmit={handleSignIn} className='p-4 w-96 '>
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={submitEmail} placeholder="abc@example.com"  type="text" required />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={submitPassword} required />
            <Button type="submit" className='mt-3 ml-24 p-1 w-36'>Login</Button>
        </form>
    );
}

export default LoginForm