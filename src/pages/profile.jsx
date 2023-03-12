import React from 'react'
import Navigation from '../components/navigation';
import { useSelector } from "react-redux";



function ProfilePage() {

  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.utilisateur
  };
  return (
  <><Navigation user={user}/>
  <div>
    
  </div>
    </>


)}

export default ProfilePage