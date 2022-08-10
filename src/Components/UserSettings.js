import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import {React,useEffect,useState} from 'react';
import { Button } from 'react-bootstrap';
import chat from '../assets/chat.png';
import { auth, db } from '../firebase';
import elect from'../json files/elect.json';
import furn from '../json files/furniture.json';

const UserSettings = () => {
  
  var elec_json = elect;
  var furn_json = furn;
  const tempList = [];
  var[data,setData] = useState([]);
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[position,setPosition] = useState('');


  async function handleSubmit(){
      // const docRef = await doc(db,"lab_test","Lab_02");
      // await setDoc(docRef,{
      //   furn_json
      // });
      // console.log("uploaded");
      const auth = getAuth();
      signOut(auth)
      .then((res)=>{
        console.log("signout");
        window.location.href ="/";
      }).catch((err)=>{
        console.log(err.message);
      })
    
  }

  const ReceiveData =async() =>{
    const docRef = await doc(db,"Users",await auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);
    setEmail(docSnap.data()['email']);
    setPassword(await auth.currentUser?.uid);
    setPosition(docSnap.data()['position']);
    console.log(email,password,position);
  }

  ReceiveData();
  useEffect(()=>{

    ReceiveData();
  },[]);

  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='border-l-sky-400 border-l-2 border-r-2 border-r-pink-500 flex p-2 rounded-md h-2/3 w-2/5'>
      <div className='m-auto w-96 relative'>
          <img src={chat} className=' mb-3 h-28 w-32 rounded-circle m-auto h-full ' alt="" />
          
          <div className=' flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>Email :</span>
            <span>{email}</span>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>password :</span>
            <span>{password}</span>
          </div>
          <div className='flex mb-2 bg-zinc-100 border-l-4 p-1 rounded-md'>
            <span className='mr-7'>position : </span>
            <span>{position}</span>
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