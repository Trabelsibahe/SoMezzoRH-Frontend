import React from "react";
import Classnames from 'classnames';
import { useSelector } from "react-redux";





function StepThree({ form, setForm, onSubmit }) {


  const errors = useSelector(state => state.errors)

  return (

    <form className="welcome_card-form" onSubmit={onSubmit}>
      <div className="welcome_input">
        <input type="date" name="datenaiss" min="1950-01-02" max="2005-01-02" className={Classnames("welcome_input-field", { "is-invalid": errors.datenaiss })} placeholder=" " value={form && form.datenaiss ? form.datenaiss : ""}
          onChange={(event) => setForm({ ...form, datenaiss: event.target.value })} />
        <label className="welcome_input-label">Date de naissance</label>
        {
          errors.datenaiss && (<div className="welcome_invalid_input">
            {errors.datenaiss}
          </div>)
        }
      </div>
      <button className="welcome_button_next" type="datenaiss" onClick={() => {
        if (form.datenaiss.isEmpty || form.datenaiss === "") {
          console.log("empty")
        }
      }}> Creér mon profil</button>

    </form>


  );
}

export default StepThree;
