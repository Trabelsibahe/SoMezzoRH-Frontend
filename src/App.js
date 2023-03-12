import './App.css';
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/login';

function App() {

  return (

    <div className="App">
    
        <BrowserRouter>
      {/*<NavigationBar  user={user} />*/}

        <Routes> 
          <Route path="/login" element={ <LoginPage /> }/>
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
