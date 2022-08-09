
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db, uid } from '../firebase';




const Report = () => {

const[lab1,setLab1] = useState([]);
const[lab2,setLab2] = useState([]);
const[student,setStudent] = useState(false);
const uid = getAuth().currentUser?.uid;

const RecieveLab02 =async () =>{
    var temp_arr = [];
    const email = auth.currentUser?.email;

    const docRef = await doc(db,"Lending","Lab_02");
    const docSnap = await getDoc(docRef);
    
    temp_arr = (await docSnap).get('temp_arr');
    // console.log('temp_arr',temp_arr);
    var temp = [];
    temp_arr.forEach((item)=>{
        // console.log(item);
        if(item['approved_by']===email && student===false){
            temp.push(item);
        }else if(item['student']===auth.currentUser?.email && student===true){
            temp.push(item);
        }
    })
    // console.log('temp',temp);
    setLab2(temp);
    // console.log("Lab02",lab2);
}



const RecieveLab01 = async() =>{
    console.log(student);
    var temp_arr = [];
    const email = auth.currentUser?.email;

    const docRef = await doc(db,"Lending","Lab_01");
    const docSnap = await getDoc(docRef);
    
    temp_arr = (await docSnap).get('temp_arr');
    console.log('temp_arr',temp_arr);
    var temp = [];
    console.log("student :",student);
    temp_arr.forEach((item)=>{
        if(student===false){
            if(item['approved_by']===email){
                temp.push(item);
                console.log("not student");
            }
        }else{
            if(item['student']===email ){
                temp.push(item);
                console.log(" student");

            }
        }
    })
    console.log('temp',temp);
    setLab1(temp);
    console.log("Lab01",lab1);
    RecieveLab02();
}



async function FindPosition(){
    const uid  = await auth.currentUser?.uid;
    // console.log(uid);
    const docRef = await doc(db,'roles',uid);
    const docSnap =await getDoc(docRef)
    if(docSnap.exists()){
        if(docSnap.data()['role']==='Student'){
            setStudent(true);
        }
    }
    else{
        console.log("user doesn't exist");
    }
 
    
    RecieveLab01();
}
// RecieveLab01();
//     RecieveLab02();
// FindPosition();




FindPosition();

useEffect(()=>
{    
    FindPosition();
    RecieveLab01();
},[student,setStudent]);




    return (
    <div>
        <div className='bg-teal-700 p-2 text-center'>
            <h1>History of Approved</h1>
        </div>
        <div className='mt-5'>
            <h2>Lab 01</h2>
        </div>
        <div className='flex -mt-5'>
              {!student && <div className='text-lg flex font-bold w-screen  items-center justify-evenly mt-10 bg-slate-500 h-16 '>
                  <span className='w-16 col-3 text-center'>No.</span>
                  <span className='w-16 col-3 text-center'>Date/Time</span>
                  <span className='w-16 col-2 text-center'>Asset_id</span>
                  <span className='w-16 col-4 text-center'>Student</span>
              </div>}

              {
                student && <div className='text-lg flex font-bold w-screen  items-center justify-evenly mt-10 bg-slate-500 h-16 '>
                <span className='w-16 col-3 text-center'>No.</span>
                <span className='w-16 col-2 text-center'>Asset_id</span>
                <span className='w-16 col-3 text-center'>Assigned Time</span>
                <span className='w-16 col-4 text-center'>Received_Time</span>
            </div>
              }
          </div>
        {
            lab1.map((item,key)=>{
                return (
                    <div key={key} className='shadow-lg justify-between mb-1  border-l-8  border-l-green-600 p-1 text-lg flex'>
                        {!student &&<div className='items-center justify-evenly flex m-auto w-8/12 h-16'>
                              <span className='w-36 col-4 text-center '>{key}</span>
                            <span className='w-36 col-4 text-center  '>{item.assigned_time}</span>
                            <span className='w-36 col-4 text-center  '>{item.asset_id}</span>
                            <span className='w-36 col-4 text-center  '>{item.student}</span>
                        </div>}
                        {student &&<div className='items-center justify-evenly flex m-auto w-8/12 h-16'>
                              <span className='w-36 col-4 text-center  '>{key}</span>
                            <span className='w-36 col-4 text-center  '>{item.asset_id}</span>
                            <span className='w-36 col-4 text-center'>{item.assigned_time}</span>
                            <span className='w-36 col-4 text-center'>{item.received_time}</span>
                        </div>}
                    </div>
                    
                );
            })
        }
        <div className='mt-5'>
            <h2>Lab 02</h2>
        </div>
        {
            lab2.map((item,key)=>{
                return (
                    <div key={key} className='shadow-lg justify-between mb-1 mt-1 border-l-8  border-l-green-600 p-2 text-lg flex'>
                        {!student &&<div className='items-center justify-evenly flex m-auto w-8/12 h-16'>
                              <span className='w-36 col-4 text-center'>{key}</span>
                            <span className='w-36 col-4 text-center  '>{item.assigned_time}</span>
                            <span className='w-36 col-4 text-center  '>{item.asset_id}</span>
                            <span className='w-36 col-4 text-center  '>{item.student}</span>
                        </div>}

                        {student &&<div className='items-center justify-evenly flex m-auto w-8/12 h-16'>
                              <span className='w-36 col-4 text-center  bg-red-400'>{key}</span>
                            <span className='w-36 col-4 text-center  bg-red-400'>{item.asset_id}</span>
                            <span className='w-36 col-4 text-center  bg-red-400'>{item.assigned_time}</span>
                            <span className='w-36 col-4 text-center  bg-red-400'>{item.received_time}</span>
                        </div>}
                    </div>
                    
                );
            })
        }
    </div>
  )
}

export default Report