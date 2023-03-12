import './App.css';
import React from "react";
import PrivateRouter from "./routes/privaterouter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./store/index";
import { setAuth } from "./util/setAuth";
import { Logout, setUser } from "./actions/auth.actions";
import jwt_decode from "jwt-decode";
import LoginPage from './pages/login';
import Navigation from './components/navigation';
import ProfilePage from './pages/profile';
import NotFoundPage from './pages/notfound';





if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };

  // return
  return (

    <div className="App">

        <BrowserRouter>
        <Routes> 
          <Route path="/login" element={ <LoginPage /> }/>
          <Route path="/profile" element={ 
          <PrivateRouter user={user}> {" "} <ProfilePage />{" "} </PrivateRouter>}/>
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
