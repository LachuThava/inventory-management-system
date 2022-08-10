import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import {React,useState} from 'react';
import { Button } from 'react-bootstrap';
import chat from '../assets/chat.png';
import { db } from '../firebase';
import elect from'../json files/elect.json';
import furn from '../json files/furniture.json';

const UserSettings = () => {
  
  var elec_json = elect;
  var furn_json = furn;
  const tempList = [];
  var[data,setData] = useState([]);
  
  
  async function handleSubmit(){
      const docRef = await doc(db,"lab_test","Lab_02");
      await setDoc(docRef,{
        furn_json
      });
      console.log("uploaded");
  }


  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='border-l-sky-400 border-l-2 border-r-2 border-r-pink-500 flex p-2 rounded-md h-2/3 w-2/5'>
      <div className='m-auto w-96 relative'>
          <img src={chat} className=' mb-3 h-28 w-32 rounded-circle m-auto h-full ' alt="" />
          
          <div className=' flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>Email :</span>
            <span>tlaksman932@gmail.com</span>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>password :</span>
            <span>tlaksman932@gmail.com</span>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>position : </span>
            <span>Student</span>
          </div>
          <div className='ml-36'>
            <Button onClick={handleSubmit}  className=''>Logout</Button>
          </div>
      </div>
    </div>
    </div>
  )
}

export default UserSettings