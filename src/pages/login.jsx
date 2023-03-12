import React from 'react'
import "../assets/styles/login.css"
import print from "../assets/images/print.png";
import logoblanc from "../assets/images/logo_blanc.png"

function LoginPage() {

  return (
    <div className="LoginPage">
      
    <img className="logoblanc" src={logoblanc} alt="logo"></img>
    <div className="login_container">
      <p className="ph1">ESPACE SOMEZZO RH</p>
      <img src={print} alt="print" className="print"></img>


      <div className='login_form'>
      <input type="text" name="matricule" className='login_input' placeholder='Matricule'></input>
      </div>
      <div className='login_form'>
      <input type="text" name="mdp"className='login_input' placeholder='Mot de passe'></input>
      </div>

      <p className='ph2'>Mot de passe oubilé?</p>
    </div>
    <p className='ph3'>Tous droits réservés - SoMezzo</p>
    </div>
  )
}

export default LoginPage