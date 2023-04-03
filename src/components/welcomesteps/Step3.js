import React from "react";
import Classnames from 'classnames';
import {useSelector } from "react-redux";





function StepThree({ form, setForm, onSubmit }) {


  const errors = useSelector(state=>state.errors)
  
  return (
    
      <form className="welcome_card-form" onSubmit={onSubmit}>
        <div className="welcome_input">
      <input type="text" className={Classnames("welcome_input-field", {"is-invalid": errors.codepostal})} placeholder=" " value={form && form.codepostal ? form.codepostal : ""}
         onChange={(event) => setForm({ ...form, codepostal: event.target.value }) } />
           <label className="welcome_input-label">Code Postale</label>
          {
          errors.codepostal && (<div  className="welcome_invalid_input">
          {errors.codepostal}
        </div>) 
        }
        </div>

         <button className="welcome_button_next" type="codepostal" onClick={() => {
           if (form.codepostal.isEmpty || form.codepostal === "" ) {
          console.log("empty") 
            } 
            }}> Creér mon profil</button>
           
         </form>

   
  );
}

export default StepThree;
