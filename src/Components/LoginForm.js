import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const LoginForm = () => {
 
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
 

    function submitEmail(event){
        setEmail(event.target.value);
    }

    function submitPassword(event){
        setPassword(event.target.value);
    }
    function handleSubmit(event){
        alert({email },{password});
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className='p-4 w-96 '>
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={submitEmail} placeholder="abc@example.com"  type="text" required />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={submitPassword} required />
            <Button onClick={handleSubmit} className='mt-3 ml-24 p-1 w-36'>Login</Button>
        </form>
    );
}

export default LoginForm