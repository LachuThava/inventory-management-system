import {React,useState }from 'react';
import {doc, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { Form,Button } from 'react-bootstrap';
import { auth,db } from '../firebase';
// import { isTagged, setIsTagged } from './Lab_1';

const PopupForm= (props)=> {

    let key = props.id;
    console.log(key);

    const[email,setEmail]=useState();

    function handleEmail(event){
        setEmail(event.target.value);
    }

    async function handleAssign(e){
        e.preventDefault();
        // isTagged=true;
        const docRef = await doc(db,'Lending',"Lab_01");
        const docSnap = getDoc(docRef);
        // console.log((await docSnap).get('temp_arr'));
        var temp_arr = [];
        temp_arr= (await docSnap).get('temp_arr');
        
        let newDate = new Date();
        var temp_map = {
            "approved_by" : auth.currentUser?.email,
            "asset_id": props.id,   
            "student":email,
            "assigned_time": newDate.getFullYear()+"/"+newDate.getMonth()+"/"+newDate.getDate()+"   "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds()
        }
        console.log(temp_map);  
        temp_arr.push(temp_map);
       
        await setDoc(docRef,
            {temp_arr}
        )
        // console.log(temp_arr);

        const docRef1 = await doc(db,"lab_test","Lab_01");
        const myDoc = await getDoc(docRef1);
        

        var elec_json = [];
        elec_json = myDoc.get("elec_json");
        console.log("elec_json",elec_json);
        elec_json.map((item,key)=>{
            if(props.id===key){
                console.log("working");
                item['student'] = email;
                item['received_time'] = newDate.getTime();
                item['assigned_boolean'] = true;
                // return {...item,student: email};  
            }
        })
        console.log("after update : ",elec_json);


        // console.log("elec_json : ",elec_json);
        await setDoc(docRef1,{elec_json});
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