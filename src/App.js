import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
import ForceRedirect from "./routes/ForceRedirect"
import WelcomePage from './pages/welcome';
import RegisterPage from './pages/register';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { GetProfileAction } from './actions/profile.actions';
import TestPage from './pages/test';
import WelcomeRouter from './routes/welcomerouter';
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
  const profile = useSelector(state => state.profiles.profile);

  const dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(GetProfileAction());
    })();
  }, [dispatch]);


  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    HasProfile: profile

  };


  // return
  return (

    <div className="App">

      <BrowserRouter>
        <Routes>


          <Route path="/login" element={
            <ForceRedirect user={user}> {" "} <LoginPage />{" "} </ForceRedirect>} />

          <Route path="/profile" element={
            <PrivateRouter user={user}> {" "} <ProfilePage /> {" "}</PrivateRouter>} />

          <Route path="/bienvenue" element={
            <WelcomeRouter user={user}> {" "} <WelcomePage /> {" "} </WelcomeRouter>} ></Route>

          <Route path="*" element={<NotFoundPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<TestPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
