import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../assets/styles/test.css";

export default function SearchAppBar() {
  return (
    <div class="avatar-wrapper">
    <img class="profile-pic" src="" />
    <div class="upload-button">
      <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
    </div>
    <input class="file-upload" type="file" accept="image/*"/>
  </div>
  
  );
}