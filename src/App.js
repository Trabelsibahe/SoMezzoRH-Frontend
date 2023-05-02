import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRouter from "./routes/privaterouter";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./store/index";
import { setAuth } from "./util/setAuth";
import { Logout, setUser } from "./actions/auth.actions";
import jwt_decode from "jwt-decode";
import LoginPage from './pages/login';
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
import Archive from './pages/archive';
import NewsLetterPage from "./pages/newsletter"
import EmployePage from './pages/espaces/employe';
import RRH_Page from './pages/espaces/rrh';
import InactivePage from './pages/inactive';
import { Redirect } from 'react-router-dom'
import ActiveRouter from './routes/ActiveRouter';
import AbsencesPage from './pages/absences';
import DemandePage from './pages/demande';
import TasksPage from './pages/espaces/taskspage';
import ExpertTasksPage from './pages/experttasks';
import ExpertDemandesPage from './pages/demandesPage';
import AbsenceList from './components/userlist/absenceArch';
import DemandeArchiveList from './components/userlist/demandeArch';
import MynotificationsPage from './pages/notifications';


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
    active: auth.user.active,

  };


  if (user.active === false) {
    <Navigate to="/inactive" />
  }

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

          <Route path="/" element={<PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />
          <Route path="/acceuil" element={<PrivateRouter user={user}> {" "} <NewsLetterPage /> {" "}</PrivateRouter>} />

          <Route path="/profil/securité" element={<PrivateRouter user={user}> {" "} <ChangePassword /> {" "}</PrivateRouter>} />

          <Route path="/monespace/expertrh/archive" element={<ExpertRouter user={user}> {" "} <Archive />{" "} </ExpertRouter>} />
          <Route path="/expertrh" element={
            <ExpertRouter user={user}> {" "} <Expert_RH_Page />{" "} </ExpertRouter>} />

          <Route path="/emp" element={<ActiveRouter user={user}> <EmployePage /></ActiveRouter>}></Route>
          <Route path="/rrh" element={<ActiveRouter user={user}> <RRH_Page /></ActiveRouter>}></Route>
          <Route path="/monespace/taches" element={<ActiveRouter user={user}> <TasksPage /></ActiveRouter>}></Route>

          <Route path="/inactive" element={<InactivePage />}></Route>
          <Route path="/monespace/mesabsences" element={<AbsencesPage />}></Route>
          <Route path="/monespace/mesdemandes" element={<DemandePage />}></Route>
          <Route path="/monespace/expertrh/taches" element={<ExpertTasksPage />}></Route>
          <Route path="/monespace/expertrh/demandes" element={
            <ExpertRouter user={user}> {" "} <ExpertDemandesPage />{" "} </ExpertRouter>} />
          <Route path="/demandearchive" element={<DemandeArchiveList />}></Route>
          <Route path="/monespace/notifications" element={<MynotificationsPage />}></Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
