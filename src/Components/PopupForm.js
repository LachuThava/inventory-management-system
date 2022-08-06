import {React,useState }from 'react';
import {doc, getDoc, updateDoc } from 'firebase/firestore';
import { Form,Button } from 'react-bootstrap';
import { auth,db } from '../firebase';

const PopupForm= (props)=> {

    let key = props.id.value;
    console.log(props);

    const[email,setEmail]=useState();

    function handleEmail(event){
        setEmail(event.target.value);
    }

    async function handleAssign(e){
        e.preventDefault();
        const docRef = await doc(db, 'Lending', "Lab_01");
        const docSnap = getDoc(docRef);
        // console.log((await docSnap).get('temp_arr'));
        var temp_arr = [];
        temp_arr= (await docSnap).get('temp_arr');
        
        let newDate = new Date()
        var temp_map = {
            "approved_by" : auth.currentUser?.email,
            "asset_id": props.id,
            "lab":"Lab_1",
            "student":email,
            "assigned_time": newDate.getFullYear()+"/"+newDate.getMonth()+"/"+newDate.getDate()+"   "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds()
        }
        temp_arr.push(temp_map);
        

            console.log(key);
            await  updateDoc(docRef,
                {temp_arr}
            )
        // }
        console.log("function is working");
    }

  return (
    <form key={props.key} className='p-2 bg-slate-200 w-80 h-36' onSubmit={handleAssign}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control className='mb-2' value={email} onChange={handleEmail} type="text" />
                    <Button type='submit'>Assign</Button>
                </form>
  )
}

export default PopupForm