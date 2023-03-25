import React, { useState } from "react";
import "../assets/styles/navigation.css";
import logo from "../assets/images/logoblanc.png"
import avatar from "../assets/images/avatar.avif"
import { Logout } from "../actions/auth.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navigation({ user }) {
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
        }}
    />
);
  
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

    <div className="Nav">
      <nav className="navbar">
        <div className="navbar2"><div className="navbar__logo"><img className="navbar__logo" src={logo} alt="logo" /></div>
</div>

      
        
        <div className="navbar_item">Bienvenue {user.name}</div>        
        <button className="navbar__toggle" onClick={toggleSidebar}>  {showSidebar ? <CloseIcon/> : <MenuIcon/>}</button>
      </nav>

      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>

        <ul className="sidebar__list">
        <ColoredLine color="white" />

        <li className="sidebar__avatar"><img className="SideNav_Avatar"src={avatar} alt="avatar"></img></li>
          <li className="sidebar__name">{user.name}</li>

          <ColoredLine color="#24377b" />

          <a href="/acceuil" className="sidebar__item"><li>Acceuil</li></a>

          <a href="/profil" className="sidebar__item"><li>Profil</li></a>

            {user.role === "EXPERT" ? (
          <a href="/expertrh" className="sidebar__item"><li>Mon espace</li></a> 
          ) : (<div></div>   )}
          
          <a href="#" className="sidebar__item"><li>Page 4</li></a>
          <ColoredLine color="white" />

          {!user.isConnected ? (<div></div>
            ) : (
          <li className="sidebar__item"><BiLogOut onClick={LogoutHandler} className="logout_icon"/></li>  )}
        </ul>
  
      </aside>

    </div>

  );

  
}

export default Navigation;
