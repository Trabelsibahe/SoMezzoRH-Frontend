import {Form, Button, Container, Stack}  from 'react-bootstrap';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from '../actions/auth.actions';
import Classnames from 'classnames';

function RegisterPage() {

  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state=>state.errors)
  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterAction(form, navigate));
  }

  return (
    <div className='Register'>
      <div style={{height: "10vh"}}></div>
  <h3 className="col-md-12 text-center">Register</h3>
  <Container className="bg-light col-md-3 mx-auto p-4">
    <Stack >
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control type="text" name="utilisateur" placeholder="Name"  onChange={onChangeHandler} className={Classnames("form-control", {"is-invalid": errors.utilisateur})}/>
          {
          errors.utilisateur && (<div  className="invalid-feedback">
          {errors.utilisateur}
        </div>)
        }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Matricule</Form.Label>
          <Form.Control type="text" name="matricule" placeholder="Enter Matricule" className={Classnames("form-control", {"is-invalid": errors.matricule})} onChange={onChangeHandler} errors={errors.matricule}/>
          {
          errors.matricule && (<div  className="invalid-feedback">
          {errors.matricule}
        </div>)
        }
          <Form.Text className="text-muted">
            This is a beta version.
          </Form.Text>
        </Form.Group>
        

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" className={Classnames("form-control", {"is-invalid": errors.password})} onChange={onChangeHandler} errors={errors.password}/>
          {
          errors.password && (<div  className="invalid-feedback">
          {errors.password}
        </div>)
        }
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" name="confirm" placeholder="Confirm Password" className={Classnames("form-control", {"is-invalid": errors.confirm})} onChange={onChangeHandler} errors={errors.confirm}/>
          {
          errors.confirm && (<div  className="invalid-feedback">
          {errors.confirm}
        </div>)
        }
        </Form.Group>
        <div className="col-md-12 text-center">
        <Button variant="dark" type="submit" >Register</Button>
        </div>       


      </Form>
    </Stack>
    </Container>
    </div>
  
  );
}

export default RegisterPage;