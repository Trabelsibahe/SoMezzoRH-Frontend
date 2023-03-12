import React, { useState } from "react";
import "../assets/styles/navigation.css";
import logo from "../assets/images/logoblanc.png"
import { Logout } from "../actions/auth.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'


function Navigation({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const LogoutHandler = () => {
    dispatch(Logout(navigate));
  };
  return (

    <div className="TestPage">

      <nav className="navbar">
        <div className="navbar__logo"><img className="navbar__logo" src={logo} alt="logo" /></div>
        <button className="navbar__toggle" onClick={toggleSidebar}>  {showSidebar ? <>&times;</> : <>&#9776;</>} </button>
        <li>ddddd</li>
      </nav>
      
      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
        <ul className="sidebar__list">
          <li className="sidebar__item">Mon espace</li>
          <div className="hr"></div>
          <li className="sidebar__item">Profil</li>
          <li className="sidebar__item">Item 3</li>
          <li className="sidebar__item">Item 4</li>
        </ul>
        <ul className="sidebar_list2">
           {!user.isConnected ? (<div></div>
            ) : (
        <li onClick={LogoutHandler} className="sidebar_item2">Se deconnecter</li>     )}
        </ul>
      </aside>

      <main className="main">
        <h1>Content</h1>
        <p>Content of your application</p>
      </main>

    </div>

  );
}

export default Navigation;
