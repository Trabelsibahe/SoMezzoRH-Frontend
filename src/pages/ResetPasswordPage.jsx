import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../actions/auth.actions';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(resetToken, newPassword, email));
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
        <label>
          Nouveau mot de passe :
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
