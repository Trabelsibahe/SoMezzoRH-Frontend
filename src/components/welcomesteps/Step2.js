import React from "react";
import { useSelector } from "react-redux";
import Classnames from 'classnames';

function StepTwo({ form, setForm, setPage, onSubmit }) {


  const errors = useSelector(state => state.errors)

  return (
    <form className="welcome_card-form" onSubmit={onSubmit}>


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
        <p>    </p>

        <div className="welcome_input">
        <input type="text"  placeholder=" "  name="gouvernorat" value={form.gouvernorat && form.gouvernorat ? form.gouvernorat : ''}
          onChange={(event) => setForm({ ...form, gouvernorat: event.target.value })} className={Classnames("welcome_input-field", { "is-invalid": errors.gouvernorat })} />
        <label className="welcome_input-label">Gouvernorat</label> 
        {
          errors.gouvernorat && (<div className="welcome_invalid_input">
            {errors.gouvernorat}
          </div>)
        } 
        </div>
        <p>    </p>

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
        <input type="number"  placeholder=" "  name="codepostal" value={form.codepostal && form.codepostal ? form.codepostal : ''}
          onChange={(event) => setForm({ ...form, codepostal: event.target.value })} className={Classnames("welcome_input-field", { "is-invalid": errors.codepostal })} />
        <label className="welcome_input-label">Code postal</label> 
        {
          errors.codepostal && (<div className="welcome_invalid_input">
            {errors.codepostal}
          </div>)
        } 
        </div>

        <p>    </p>
        <div className="welcome_input">
        <input type="text"  placeholder=" "  name="adresse" value={form.adresse && form.adresse ? form.adresse : ''}
          onChange={(event) => setForm({ ...form, adresse: event.target.value })} className={Classnames("welcome_input-field", { "is-invalid": errors.adresse })} />
        <label className="welcome_input-label">Adresse</label> 
        {
          errors.adresse && (<div className="welcome_invalid_input">
            {errors.adresse}
          </div>)
        } 
        </div>
        
      <button className="welcome_button_next" type="submit" onClick={() => {
        if (form.ville.isEmpty || form.ville === "" || form.pays.isEmpty || form.pays === "" || form.codepostal.isEmpty || form.codepostal === ""
        || form.gouvernorat.isEmpty || form.gouvernorat === "" || form.adresse.isEmpty || form.adresse === "") {
          console.log("empty")
        } else {
          setPage((currPage) => currPage + 1);
        }
      }}>Suivant</button>

    </form>
  );
}

export default StepTwo;
