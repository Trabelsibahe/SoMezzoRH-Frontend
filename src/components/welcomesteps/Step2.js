import React from "react";
import { useSelector } from "react-redux";
import Classnames from 'classnames';

function StepTwo({ form, setForm, setPage, onSubmit }) {
  const errors = useSelector(state => state.errors)
  const TunisiaGouvernorats = [
    { label: "Sélectionnez un gouvernorat", value: "" },{ label: "Tunis", value: "Tunis" },{ label: "Ariana", value: "Ariana" },
    { label: "Ben Arous", value: "Ben Arous" },{ label: "Manouba", value: "Manouba" },{ label: "Nabeul", value: "Nabeul" },
    { label: "Zaghouan", value: "Zaghouan" },{ label: "Bizerte", value: "Bizerte" },{ label: "Béja", value: "Béja" },
    { label: "Jendouba", value: "Jendouba" },{ label: "Kef", value: "Kef" },{ label: "Kef", value: "Kef" },
    { label: "Siliana", value: "Siliana" },{ label: "Kairouan", value: "Kairouan" },{ label: "Kasserine", value: "Kasserine" },
    { label: "Sidi Bouzid", value: "Sidi Bouzid" },{ label: "Sousse", value: "Sousse" },{ label: "Monastir", value: "Monastir" },
    { label: "Mahdia", value: "Mahdia" },{ label: "Sfax", value: "Sfax" },{ label: "Gabès", value: "Gabès" },
    { label: "Medenine", value: "Medenine" },{ label: "Tataouine", value: "Tataouine" },{ label: "Tozeur", value: "Tozeur" },
    { label: "Kebili", value: "Kebili" },{ label: "Gafsa", value: "Gafsa" }
  ];
  
  const FranceGouvernorats = [
    { label: "Sélectionnez un gouvernorat", value: "" },{ label: "Auvergne-Rhône-Alpes", value: "Auvergne-Rhône-Alpes" }, { label: "Bourgogne-Franche-Comté", value: "Bourgogne-Franche-Comté" },
    { label: "Bretagne", value: "Bretagne" },{ label: "Centre-Val de Loire", value: "Centre-Val de Loire" },{ label: "Corse", value: "Corse" },
    { label: "Grand Est", value: "Grand Est" },{ label: "Hauts-de-France", value: "Hauts-de-France" },{ label: "Île-de-France", value: "Île-de-France" },
    { label: "Normandie", value: "Normandie" },{ label: "Nouvelle-Aquitaine", value: "Nouvelle-Aquitaine" },{ label: "Occitanie", value: "Occitanie" }, 
    { label: "Pays de la Loire", value: "Pays de la Loire" },{ label: "Provence-Alpes-Côte d'Azur", value: "Provence-Alpes-Côte d'Azur" },
    { label: "Guadeloupe", value: "Guadeloupe" },{ label: "Martinique", value: "Martinique" },{ label: "Guyane", value: "Guyane" },
    { label: "La Réunion", value: "La Réunion" },{ label: "Mayotte", value: "Mayotte" }
  ];
  
  return (
    <form className="welcome_card-form" onSubmit={onSubmit}>

<div className="welcome_input">
      <select
        name="pays"
        value={form.pays}
        onChange={(event) =>
          setForm({ ...form, pays: event.target.value })
        }
        className={Classnames("welcome_input-field", {
          "is-invalid": errors.pays,
        })}
      >
        <option value="">Sélectionnez un pays</option>
        <option value="Tunisie">Tunisie</option>
        <option value="France">France</option>
      </select>
      <label className="welcome_input-label"></label>
      {errors.pays && (
        <div className="welcome_invalid_input">{errors.pays}</div>
      )}
    </div>
    <p> </p>

    <div className="welcome_input">
      {form.pays === "Tunisie" ? (
        <select
          name="gouvernorat"
          value={form.gouvernorat && form.gouvernorat}
          onChange={(event) =>
            setForm({ ...form, gouvernorat: event.target.value })
          }
          className={Classnames("welcome_input-field", {
            "is-invalid": errors.gouvernorat,
          })}
        >
          {TunisiaGouvernorats.map((gouvernorat, index) => (
            <option key={index} value={gouvernorat.value}>
              {gouvernorat.label}
            </option>
          ))}
        </select>
      ) : form.pays === "France" ? (
        <select
          name="gouvernorat"
          value={form.gouvernorat && form.gouvernorat}
          onChange={(event) =>
            setForm({ ...form, gouvernorat: event.target.value })
          }
          className={Classnames("welcome_input-field", {
            "is-invalid": errors.gouvernorat,
          })}
        >
          {FranceGouvernorats.map((gouvernorat, index) => (
            <option key={index} value={gouvernorat.value}>
              {gouvernorat.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder=" gouvernorat"
          name="gouvernorat"
          value={form.gouvernorat && form.gouvernorat}
          onChange={(event) =>
            setForm({ ...form, gouvernorat: event.target.value })
          }
          className={Classnames("welcome_input-field", {
            "is-invalid": errors.gouvernorat,
          })}
        />
      )}
      <label className="welcome_input-label"></label>
      {errors.gouvernorat && (
        <div className="welcome_invalid_input">{errors.gouvernorat}</div>
      )}
    </div>
    <p> </p>

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
        } else {
          setPage((currPage) => currPage + 1);
        }
      }}>Suivant</button>

    </form>
  );
}

export default StepTwo;
