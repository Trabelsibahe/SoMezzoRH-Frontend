import React from 'react'

function LoginPage() {
  return (
    <div className="App">
    <img src="somezzologo BLANC.png"></img>
    <div className="rect1">
      <p className="ph1">ESPACE SOMEZZO RH</p>
      <img src="print.png" className="print"></img>
      <input type="text" id="matricule" name="matricule" placeholder="Matricule" required ></input>
      <input type="text" id="mdp" name="mdp" placeholder="Mot De Passe" required ></input>
      <input type="submit" value="connexion" id="conx"></input>
      <p className='ph2'>Mot de passe oubilé? <a href=''> Récupérer votre compte</a></p>
    </div>
    <p className='ph3'>Tous droits réservés - SoMezzo</p>
  </div>
  )
}

export default LoginPage