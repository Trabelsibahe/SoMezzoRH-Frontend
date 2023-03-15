import React from 'react'
import "../assets/styles/welcome.css"
import {useSelector,useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {Container}  from 'react-bootstrap';
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";
import { useNavigate } from 'react-router-dom'
import StepOne from "../components/welcomesteps/Step1";
import StepTwo from "../components/welcomesteps/Step2";
import StepThree from "../components/welcomesteps/Step3";


function WelcomePage() {

    const auth = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const CurrentUser = {
      name: auth.utilisateur,
      email: auth.matricule,
      role: auth.role, 
     }

    const [form, setForm] = useState("")
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const errors = useSelector(state=>state.errors)

    const onSubmit = (e)=>{
      e.preventDefault();
      dispatch(SetProfileAction(form, setShow, setMessage, navigate))
      if (errors.tel) {
      }
      }
      
      useEffect(() => {  ( () => {
        dispatch(GetProfileAction());
       })(); }, []);


       const [page, setPage] = useState(0);  
       const FormTitles = ["Step 1", "Step 2", "Step 3"];


       const PageDisplay = () => {
        if (page === 0) {
          return <StepOne form={form} setForm={setForm} onSubmit={onSubmit} setPage={setPage}/>;
        } else if (page === 1) {
          return <StepTwo form={form} setForm={setForm}  onSubmit={onSubmit} setPage={setPage}/>;
        } else {
          return <StepThree form={form} setForm={setForm} onSubmit={onSubmit}/>;
        }
      };

      return (

        
       <div className='welcome_page'>
        
        <div className='welcome_progressbar1'>
          <div className="welcome_progressbar" style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }} >
           <p>⠀</p></div></div>

        <div className='welcome_card'>

        <div className="welcome_card-image">	
        <h2 className="welcome_card-heading">Bienvenue {CurrentUser.name} !</h2>
        <div className="welcome_step">{FormTitles[page]}</div>

        </div>
          <div className="welcome_card-form">{PageDisplay()}</div> 

          <button className="welcome_button_previous" disabled={page === 0} onClick={() => { setPage((currPage) => currPage - 1); }}> Précédent  </button>

          <div className="welcome_card-info">
			<p className='welcome_p'>Merci de bien vouloir remplir le formulaire.</p>
		</div>

          </div>
          <p className='welcome_footer'>Tous droits réservés - SoMezzo</p>
       </div>
       
)}


export default WelcomePage