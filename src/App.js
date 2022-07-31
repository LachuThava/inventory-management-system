import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import LoginForm from "./Components/LoginForm";
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import {Routes,Route} from 'react-router-dom';
import UserSettings from "./Components/UserSettings";
import Lab from "./Components/Lab";
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
          <Route path='/Lab' element={<Lab />} />
          <Route path="/chatting" element={<Chat />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
