import React, { useEffect, useState } from 'react'
import { MinusCircleIcon, RefreshIcon, TagIcon} from '@heroicons/react/solid';
import {TagIcon as UnTaggedIcon}  from '@heroicons/react/outline';
import { auth, db} from '../firebase.js';
import { collection, doc ,getDoc, onSnapshot, setDoc, updateDoc} from 'firebase/firestore';
import { Button } from 'react-bootstrap';

import Request from './Request.js';
import Popup from 'reactjs-popup';
import PopupForm from './PopupForm.js';
import InsertForm from './InsertForm.js';




const Lab_1 = () => {
    var[data,setData] = useState([]);
    var[idBoolean,setIdBoolean] = useState(false);
    const lab_name = "Lab_01";

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
    checkRoleId();

    useEffect(()=>{
        RetrieveData();
    },[]);
    
    function handleRepair(){

    }

  
    
async function HandleRemove(props){
    console.log("props : ",props);
        const docRef = await doc(db,"lab_test","Lab_01");
        const myDoc = await getDoc(docRef);
        var temp =myDoc.get('elec_json');
        // onSnapshot(docRef,(doc)=>{
        //     elec_json = doc.get('elec_json');
        // })
        var elec_json = [];
        temp.map((item,key)=>{
            if(props!==key){
                elec_json.push(item);
            }
        })
        console.log("elec_json : ",elec_json);
        
        await setDoc(docRef,{elec_json});
        console.log("update db");
}
   async function handleRemoveTag(props){
    // e.preventDefault();
        const docRef1 = await doc(db,"lab_test","Lab_01");
        const myDoc = await getDoc(docRef1);
        console.log(props.id);
        

        var elec_json = [];
        elec_json = myDoc.get("elec_json");
        console.log("elec_json",elec_json);
        elec_json.map((item,key)=>{
            if(props===key){
                console.log("working");
                item['student'] = "";
                item['received_time'] = "";
                item['assigned_boolean'] = false;
            }
        })
        console.log("after update : ",elec_json);


        // console.log("elec_json : ",elec_json);
        await setDoc(docRef1,{elec_json});
    }

    function HandleTag(props){
        return (
            <Popup trigger={<div>
                            {props.tagbool &&<TagIcon onClick={() =>handleRemoveTag(props.id)} className='h-5 w-5 mr-2 cursor-pointer  '/>}
                            {!props.tagbool && <UnTaggedIcon  className='h-5 w-5 mr-2 cursor-pointer  '/>}
                    </div>}
            position='left bottom'
            >
                {!props.tagbool && <PopupForm id={props.id} name={lab_name} />}
               {/* {props.tagbool && <RemoveForm id={props.id} />} */}
            </Popup>
        );
    }

    const RetrieveData=async()=>{

        const myDocRef = await doc(db,"lab_test","Lab_01");
        
        onSnapshot(myDocRef,(doc)=>{
            setData(doc.get('elec_json'));
        })
    }




// RetrieveData();



function HandleInsert(){
    return(
        <Popup trigger={<Button  className='rounded-lg p-2 w-36 bg-green-400 '>Insert</Button>}
        position='right  bottom'
        >
            <InsertForm  />
        </Popup>
    );



}
if(data.length===0){
    return (<div>Empty</div>);
}else{

    return (
      <div className=" m-auto">
          <div className='col flex justify-between'>
              <h1 className='text-7xl'>Lab_1</h1>
              <div className=' w-1/3 justify-center bg-slate-400  h-20 items-center'>
                  <span className='font-semibold'>Lecturer : MR.x<br/></span>
                  <span className='font-semibold'>Technical Officer : Mr.y</span>
              </div>
          </div>
          <div className='col flex mt-10 ml-3  '>
              < HandleInsert />
              
          </div>
          <div className='flex -mt-5'>
              <div className=' flex font-bold w-screen  items-center justify-evenly mt-10 bg-slate-500 h-16 '>
                  <span className='w-16 col-3 text-center'>No.</span>
                  <span className='w-16 col-3 text-center'>Description</span>
                  <span className='w-16 col-2 text-center'>Name</span>
                  <span className='w-16 col-4 text-center'>Received_student</span>
              </div>
          </div>
          <div >
              { 
                  data.map((item,key) =>{
                      return( <div key={key} className='bg-stone-100 justify-between mb-2 mt-1  border-4 flex'>
                          <div className='items-center justify-evenly flex m-auto w-8/12 h-24'>
                              <span className='w-36 col-4 text-center  bg-red-400'>{key}</span>
                              <span className='w-56 col-4 text-center bg-green-300'>{item.description}</span>
                              <span className='w-36 col-4 text-center bg-blue-300'>{item.name}</span>
                              <span className='w-36 col-4 text-center  bg-yellow-300'>{item.student}</span>
                          </div>
                        {!idBoolean &&  <div className='flex items-center  w-1/12 justify-center '>
                              <RefreshIcon onChange={handleRepair} className='h-5 w-5 mr-2 cursor-pointer ' />
                              <HandleTag id={key} tagbool={item.assigned_boolean} />
                              <MinusCircleIcon onClick={() =>{HandleRemove(key)}} className='h-5 w-5 mr-2 cursor-pointer' />
                          </div>}
                      </div>
                      )
                  })  
              }
               </div>
          {<Request/>}    
      </div>
    )
}
}

export default Lab_1