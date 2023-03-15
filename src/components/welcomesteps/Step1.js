import React from "react";
import Classnames from 'classnames';
import {useSelector } from "react-redux";

function StepOne({ form, setForm, onSubmit, setPage}) {

  const errors = useSelector(state=>state.errors)


  return (
    <form className="welcome_card-form" onSubmit={onSubmit}>
    <div className="welcome_input">
      <input type="text" name="tel" placeholder=" " value={form.tel && form.tel ? form.tel : ''}
       onChange={(event) => setForm({ ...form, tel: event.target.value }) } className={Classnames("welcome_input-field", {"is-invalid": errors.tel})}/>
       <label className="welcome_input-label">Numéro de télephone</label>
        {
          errors.tel && (<div  className="welcome_invalid_input">
          {errors.tel}
        </div>) 
        }
       
       </div>
       <button className="welcome_button_next" type="submit" onClick={() => { 
        if (form.tel.isEmpty || form.tel === "") {
          console.log("empty")
        } else {
          setPage((currPage) => currPage + 1);
        }
        }}>Suivant</button>
       </form>
  );
  
}

export default StepOne;
