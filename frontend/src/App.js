import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import UserList from './UserList';
import axios from 'axios';

function App() {

  
  return (
   
    <div className="App">
      
      
      <UserList/>
      
    </div>
    );


}

export default App;
