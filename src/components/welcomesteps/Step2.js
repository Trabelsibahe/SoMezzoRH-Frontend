import React from "react";
import { useSelector } from "react-redux";
import Classnames from 'classnames';

function StepTwo({ form, setForm, setPage, onSubmit }) {


  const errors = useSelector(state => state.errors)

  return (
    <form className="welcome_card-form" onSubmit={onSubmit}>

      <div className="welcome_input">
        <input type="text"  placeholder=" " name="ville" value={form.ville && form.ville ? form.ville : ''}
          onChange={(event) => setForm({ ...form, ville: event.target.value })} className={Classnames("welcome_input-field", { "is-invalid": errors.ville })} />
                <label className="welcome_input-label">Ville</label>

        {
          errors.ville && (<div className="welcome_invalid_input">
            {errors.ville}
          </div>)
        }
        </div>
        <p>    </p>
        <div className="welcome_input">
        <input type="text"  placeholder=" "  name="pays" value={form.pays && form.pays ? form.pays : ''}
          onChange={(event) => setForm({ ...form, pays: event.target.value })} className={Classnames("welcome_input-field", { "is-invalid": errors.pays })} />
        <label className="welcome_input-label">Pays</label> 
        {
          errors.pays && (<div className="welcome_invalid_input">
            {errors.pays}
          </div>)
        } 
        </div>
       
      <button className="welcome_button_next" type="submit" onClick={() => {
        if (form.ville.isEmpty || form.ville === "" || form.pays.isEmpty || form.pays === "") {
          console.log("empty")
        } else {
          setPage((currPage) => currPage + 1);
        }
      }}>Suivant</button>

    </form>
  );
}

export default StepTwo;
