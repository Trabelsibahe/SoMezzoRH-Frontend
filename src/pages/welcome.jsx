import React from 'react'
import "../assets/styles/welcome.css"

import {useSelector,useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {Form, Container, Button}  from 'react-bootstrap';
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";
import { useNavigate } from 'react-router-dom'


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
      }
  
      const onChangeHandler = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        
      })
    }
  
    useEffect(() => {
      ( () => {
        dispatch(GetProfileAction());
        
       })();
       }, [dispatch]);
        
       return (
       <div className='welcome_page'>
        <h1>Bievenue {CurrentUser.name}</h1>
        <Container className="bg-light col-md-3 mx-auto p-4">
          <div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>{message}</div>
          <Form onSubmit={onSubmit}>
            Telephone<Form.Control name="tel" label="Telephone" type="text" value={form.tel && form.tel ? form.tel : ''} onChange={onChangeHandler} />
            ville<Form.Control name="ville" value={form && form.ville ? form.ville : ""} label="ville" type="text" onChange={onChangeHandler} />
            Country<Form.Control name="pays" label="pays" type="text" value={form && form.pays ? form.pays : ""} onChange={onChangeHandler} />
            PostalCode<Form.Control name="codepostal" label="codepostal" type="text" value={form && form.codepostal ? form.codepostal : ""} onChange={onChangeHandler} />
            <Button type="submit" variant="dark">Enregistrer</Button>
            </Form>
            </Container>

            </div>
)}


export default WelcomePage