import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetEmail, Getuser } from '../actions/auth.actions';

const EmailFormPage = () => {
  const dispatch = useDispatch();

  

  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendPasswordResetEmail(email)); // Supprimez les accolades autour de `email`
  };

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Adresse e-mail :
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default EmailFormPage;
