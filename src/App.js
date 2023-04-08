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
import ChangePassword from './pages/profilepassword';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { GetProfileAction } from './actions/profile.actions';
import WelcomeRouter from './routes/welcomerouter';
import Expert_RH_Page from './pages/espaces/expert_rh';
import ExpertRouter from "./routes/expertrouter";
import Admin from './pages/admin';
import Archive from './pages/archive';
import AccountMenu from "./components/account_menu"
import NewsLetterPage from "./pages/newsletter"
<<<<<<< HEAD
import Absence from './pages/absence';

=======
import EmployePage from './pages/espaces/employe';
>>>>>>> 94c669d74adc75de62ca0d32c1ffed87f833ce72
if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

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
    HasProfile: profile,

  };


  // return
  return (

    <div className="App">

      <BrowserRouter>
        <Routes>


          <Route path="/login" element={
            <ForceRedirect user={user}> {" "} <LoginPage />{" "} </ForceRedirect>} />

          <Route path="/profil" element={
            <PrivateRouter user={user}> {" "} <ProfilePage /> {" "}</PrivateRouter>} />

          <Route path="/bienvenue" element={
            <WelcomeRouter user={user}> {" "} <WelcomePage /> {" "} </WelcomeRouter>} ></Route>

          <Route path="*" element={<NotFoundPage />} />

<<<<<<< HEAD
          <Route path="/"element={ <PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />
          <Route path="/acceuil" element={ <PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />
          <Route path="/absence" element={ <PrivateRouter user={user}> {" "} <Absence /> {" "}</PrivateRouter>} />
=======
          <Route path="/" element={<PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />
          <Route path="/acceuil" element={<PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />
>>>>>>> 94c669d74adc75de62ca0d32c1ffed87f833ce72

          <Route path="/profil/securité" element={<PrivateRouter user={user}> {" "} <ChangePassword /> {" "}</PrivateRouter>} />

          <Route path="/listuser" element={<ExpertRouter user={user}> {" "} <Admin />{" "} </ExpertRouter>} />
          <Route path="/archive" element={<ExpertRouter user={user}> {" "} <Archive />{" "} </ExpertRouter>} />
          <Route path="/expertrh" element={
            <ExpertRouter user={user}> {" "} <Expert_RH_Page />{" "} </ExpertRouter>} />
          <Route path="/emp" element={<EmployePage />}></Route>
          <Route path="/test" element={<AccountMenu />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
