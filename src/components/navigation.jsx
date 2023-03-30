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
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation({ user }) {
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            width: "70%",
            margin: "2em"
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
        <div className="navbar2"><a  href="/"><img className="navbar_logo" src={logo} alt="logo" /></a>
      </div>

      
        <div className="navbar_item">Bienvenue {user.name}</div>        
        <button className="navbar_toggle" onClick={toggleSidebar}>  {showSidebar ? <CloseIcon/> : <MenuIcon/>}</button>
      </nav>

      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>

        <ul className="sidebar_list">

        <li className="sidebar_avatar"><img className="SideNav_Avatar"src={avatar} alt="avatar"></img></li>
          <li className="sidebar_name">{user.name}</li>

          <ColoredLine color="white" />

          <a href="/acceuil" className="sidebar_item"><li>Acceuil</li></a>

          <NavDropdown menuVariant="dark" title="Profil" className="sidebar_item">
            <NavDropdown.Item  href="/profil">Profil</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/profil/securité">Securité</NavDropdown.Item>
          </NavDropdown>

            {user.role === "EXPERT" ? (
          <a href="/expertrh" className="sidebar_item"><li>Mon espace</li></a> 
          ) : (<div></div>   )}

          <a href="#" className="sidebar_item"><li>Page 4</li></a>

          <ColoredLine color="white" />
          {!user.isConnected ? (<div></div>
            ) : (
          <div className="sidebar_logout"><BiLogOut className="logout_icon" onClick={LogoutHandler} /> Déconnexion</div>  )}
        </ul>
      </aside>

    </div>

  );

  
}

export default Navigation;
