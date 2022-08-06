import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import LoginForm from "./Components/LoginForm";
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import {Routes,Route} from 'react-router-dom';
import UserSettings from "./Components/UserSettings";
import Lab_1 from "./Components/Lab_1";
import Lab_2 from "./Components/Lab_2";
import Chat from "./Components/Chat";


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path = '/menu' element={<Menu/>}  />
          <Route path='/Settings' element={<UserSettings />} />
          <Route path='/Lab_1' element={<Lab_1 />} />
          <Route path='/Lab_2' element={<Lab_2 />} />
          <Route path="/chatting" element={<Chat />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
