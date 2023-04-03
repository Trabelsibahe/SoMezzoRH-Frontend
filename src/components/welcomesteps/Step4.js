import React from "react";
import Classnames from 'classnames';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function StepFour({ form, setAvatar, onSubmit, setPage }) {

  const errors = useSelector(state => state.errors);

  return (
    <form className="welcome_card-form" onSubmit={onSubmit}>

      <div className="welcome_upload_button">
        <p className="welcome_p" style={{ textAlign: "center", fontSize: "13px" }}>Chargez un avatar pour votre profil</p>
          <label for="file" className="welcome_label-file"><CloudUploadOutlinedIcon fontSize="large" /></label>
          <input id="file" className="welcome_input-file" type="file" name="avatar" accept="image/png, image/jpeg, image/avif"
            onChange={(e) => setAvatar(e.target.files[0])} />
          <p className="welcome_p" style={{ textAlign: "center", padding: "2px", fontSize: "13px" }}>
            Cette étape est facultative, vous pouvez l'ignorer et la compléter plus tard.</p>
      </div>
      <button className="welcome_button_next" type="submit" onClick={() => {

        setPage((currPage) => currPage + 1);

      }}>Suivant</button>
    </form>
  );

}

export default StepFour;
