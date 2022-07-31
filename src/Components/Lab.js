import React, { useEffect, useState } from 'react'
import {ChatIcon, MinusCircleIcon, PlusCircleIcon} from '@heroicons/react/solid';
import {app, auth, db, uid} from '../firebase.js';
import { doc, DocumentReference, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';

import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
const Lab = () => {

    // const data = [
    //     { name: "Anom", age:19, gender: "Male" },
    //     { name: "Megha", age:19, gender: "Female" },
    //     { name: "Subham", age:25, gender: "Male"},
    //   ]
    var[data,setData] = useState([]);
    var[idBoolean,setIdBoolean] = useState(false);

    const checkRoleId = async()=>{
        const uid  = await auth.currentUser?.uid;
        // console.log(uid);
        const docRef = await doc(db,'roles',uid);
        const docSnap =await getDoc(docRef)
        if(docSnap.exists()){
            if(docSnap.data()['role']==='Student'){
                setIdBoolean(true);
            }
        }
        else{
            console.log("user doesn't exist");
        }
    }
    
    
    const check = async()=>{
        const docRef = await doc(db,'lab_test','Lab_01');
         onSnapshot(docRef,(doc) => {
            const tempList = [];
            doc.get("assets").map((item)=>{
                tempList.push(item);
            })
            // setData(tempList);
            setData(doc.get("assets"));
         })  
}
check();
checkRoleId();

  return (
    <div className=" m-auto">
        <div className='col flex justify-between'>
            <h1 className='text-7xl'>Lab_1</h1>
            <div className=' w-1/3 justify-center bg-slate-400  h-20 items-center'>
                <span className='font-semibold'>Lecturer : MR.x<br/></span>
                <span className='font-semibold'>Technical Officer : Mr.y</span>
            </div>
        </div>
        <div className='flex'>
            <div className=' flex font-bold w-11/12  items-center justify-evenly mt-10 bg-slate-500 h-16 '>
                <span className='w-16'>No.</span>
                <span className='w-16'>Description</span>
                <span className='w-16'>Name</span>
                <span className='w-16'>Gender</span>
            </div>
            <div className='w-1/12 bg-slate-500 mt-10'></div>
        </div>
        <div >
            { 
                data.map((item,key) =>{
                    return( <div key={key} className='bg-stone-100 justify-between mb-2 mt-1  border-4 flex'>
                        <div className='items-center justify-evenly flex w-11/12 h-12'>
                            <span className='w-auto'>{key}</span>
                            <span className='w-auto'>{item.description}</span>
                            <span className='w-auto '>{item.name}</span>
                            <span className='w-auto'>{item.id}</span>
                        </div>
                      {!idBoolean &&  <div className='flex items-center  w-1/12 justify-center '>
                            <PlusCircleIcon className='h-5 w-5 mr-2 cursor-pointer' />
                            <ChatIcon className='h-5 w-5 mr-2 cursor-pointer' />
                            <MinusCircleIcon className='h-5 w-5 mr-2 cursor-pointer' />
                        </div>}
                    </div>)
                })
            }
        </div>

        <div className='m-auto max-w-lg flex-col shadow-md border-t-8 h-11/12 p-2'>
            <div>
                <h1>Request</h1>
                <Form className=''>
                <InputGroup className='mb-2'>
                        <InputGroup.Text>Email</InputGroup.Text>
                        <Form.Control as="email" aria-label="With textarea" />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>With textarea</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <Button className='mb-2' type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
        
        
        
    </div>
  )
}

export default Lab