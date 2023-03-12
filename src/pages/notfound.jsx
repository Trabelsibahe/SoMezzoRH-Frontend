import React from 'react'
import "../assets/styles/notfound.css"
import textelogobleu from "../assets/images/textelogobleu.png";


function NotFoundPage() {
  return (
    <div className="NotFoundPage">
    <img className="logoblue" src={textelogobleu}></img>
  <div className="container">
    <h2>Oops! Page non trouvée.</h2>
    <h1>404 </h1>
    <p>Nous ne pouvons pas trouver la page que vous recherchez. </p>
    <a href='#'>Rentrer à votre espace</a>
  </div>
  </div>
  )
}

export default NotFoundPage