import React, { useState } from 'react'
import "../assets/styles/login.css"
import print from "../assets/images/print.png";
import logoblanc from "../assets/images/logo_blanc.png"
import Classnames from 'classnames';
import { LoginAction } from '../actions/auth.actions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'



function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state=>state.errors)
  const [form, setForm] = useState({})
  
  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form, navigate));
    }


  return (
    <div className="LoginPage">
    <form  onSubmit={onSubmit}>
        <img className="logoblanc" src={logoblanc} alt="logo"></img>
        <div className="login_container">
          <p className="ph1">ESPACE SOMEZZO RH</p>
          <img className='print' src={print} alt="print"></img>
          


          <div className='login_form'>
            <input type="text" name="matricule" className="login_input" classnames={Classnames("form-control", {"is-invalid": errors.matricule})} onChange={onChangeHandler}  placeholder='Matricule'></input>
            {
            errors.matricule && (<div  className="login_error">{errors.matricule}</div>)}
          </div>

          <div className='login_form'>
            <input type="password" name="password" className='login_input' classnames={Classnames("form-control", {"is-invalid": errors.password})}  onChange={onChangeHandler}  placeholder='Mot de passe' autoComplete="off"></input>
            { 
            errors.password && (<div  className="login_error">
              {errors.password} </div>)} </div>
          <button type="submit" className='login_button'>S'identifer</button>
        
      <p className='ph2'>Mot de passe oubilé? Récuperer votre compte</p>
    </div><p className='ph3'>Tous droits réservés - SoMezzo</p>
    </form>
    </div>
  )
}

export default LoginPage