import React from 'react';
import {Routes,Route} from "react-router-dom"
import Dashboard from "../components/admin/Dashboard"
import SignIn from '../pages/SignIn';
import NavBar from "../components/admin/NavBar"

export default function AdminNavigator() {
  return (
    <div>
        <NavBar /> 
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/signin" element={<SignIn />} />

            
        </Routes>
    </div>
  );
    
}
