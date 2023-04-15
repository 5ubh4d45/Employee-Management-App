import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import AddEmployee from './components/employee/AddEmployee';
import ListEmployee from './components/employee/ListEmployee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateEmployee from './components/employee/UpdateEmployee';

function App() {
  return (
    <div className="">
      <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<ListEmployee />} />
          <Route path="/" element={<ListEmployee />} />
          <Route path="/employeeList" element={<ListEmployee />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
      
      </>
    </div>
  );
}

export default App;
