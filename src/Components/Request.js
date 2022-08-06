import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Request = () => {

    var[toEmail,setToEmail] = useState();
    var[details,setDetails] = useState();

    function handleToEmail(event){
        setToEmail(event.target.value);
    }

    function handleDetails(event){
        setDetails(event.target.value);
    }

    async function handleSubmit(e){
        // e.preventDefault();
        // const docRef = await doc(db,`message/${toEmail}`);
        // const docSnap = getDoc(docRef);
        // await setDoc(docRef,{
        //     "from" : auth.currentUser?.email,
        //     "detail" : details,
        // })
        
      
    }

  return (
    <div className='m-auto max-w-lg flex-col shadow-md border-t-8 h-11/12 p-2'>
            <div>
                <h1>Request</h1>
                 <Form onSubmit={handleSubmit} className=''>
                <InputGroup className='mb-2'>
                        <InputGroup.Text>Email</InputGroup.Text>
                        <Form.Control value={toEmail} onChange={handleToEmail} type='text' />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>With textarea</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" value={details} onChange={handleDetails} />
                    </InputGroup>
                    <Button className='mb-2' type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
  )
}

export default Request