import React, { useState } from "react";
import "../assets/styles/navigation.css";
import logo from "../assets/images/logoblanc.png";
import avatar from "../assets/images/avatar.avif";
import { Logout } from "../actions/auth.actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountMenu from "./account_menu";
import IconButton from "@mui/material/IconButton";
import NotificationMenu from "./notification_menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Divider } from "@mui/material";

function Navigation({ user }) {
  const profile = useSelector((state) => state.profiles.profile);
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        width: "70%",
        margin: "2em",
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
    navigate("/login")
  };

  return (
    <div className="Nav">
      <nav className="navbar">
        <div className="navbar2">
          <a href="/">
            <img className="navbar_logo" src={logo} alt="logo" />
          </a>
        </div>

        <div className="navbar_item">
          <NotificationMenu />
          <AccountMenu profile={profile} LogoutHandler={LogoutHandler} />
          <IconButton
            sx={{ color: "black" }}
            className="navbar_toggle"
            onClick={toggleSidebar}
          >
            {" "}
            {showSidebar ? (
              <CloseIcon icon={CloseIcon} />
            ) : (
              <MenuIcon icon={MenuIcon} />
            )}
          </IconButton>
        </div>
      </nav>

      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
        <ul className="sidebar_list">
          <li className="sidebar_avatar">
            {profile?.avatar ? (
              <img
                className="SideNav_Avatar"
                src={`http://localhost:3030/${profile.avatar}`}
                alt=""
              />
            ) : (
              <img className="SideNav_Avatar" src={avatar} alt="" />
            )}
          </li>

          <li className="sidebar_name">
            {user.nom} {user.prenom}
          </li>
          <li className="sidebar_name2">{user.titre}</li>
        </ul>

        <ul className="sidebar_list2">
          <li>
            <a href="/acceuil" className="sidebar_itemhome">
              <HomeOutlinedIcon /> Acceuil
            </a>
          </li>
          {user.role === "EXPERT" ? (
            <li>
              <a href="/expertrh" className="sidebar_item">
                <DashboardOutlinedIcon /> Mon espace
              </a>
            </li>
          ) : user.role === "EMP" ? (
            <li>
              <a href="/emp" className="sidebar_item">
                Mon espace
              </a>
            </li>
          ) : user.role === "RRH" ? (
            <li>
              <a href="/rrh" className="sidebar_item">
                Mon espace
              </a>
            </li>
          ) : null}
          <li>
            <a href="/profil" className="sidebar_item">
              <Person2OutlinedIcon /> Profil
            </a>
          </li>
          <li>
            <a href="/profil/securité" className="sidebar_item">
              <ShieldOutlinedIcon /> Securité
            </a>
          </li>
        </ul>
        <ul className="sidebar_list3">
          <li className="sidebar_logout" onClick={LogoutHandler}>
            <span className="sidebar_item">
              <BiLogOut className="logout_icon" /> Déconnexion
            </span>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Navigation;
