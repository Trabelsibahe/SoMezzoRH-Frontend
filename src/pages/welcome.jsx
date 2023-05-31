import React from "react";
import "../assets/styles/welcome.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SetProfileAction, GetProfileAction } from "../actions/profile.actions";
import { useNavigate } from "react-router-dom";
import StepOne from "../components/welcomesteps/Step1";
import StepTwo from "../components/welcomesteps/Step2";
import StepThree from "../components/welcomesteps/Step3";
import StepFour from "../components/welcomesteps/Step4";
import IsLoading from '../components/isLoading';

import { BiLogIn } from "react-icons/bi";
import { Logout } from "../actions/auth.actions";

function WelcomePage() {
  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const CurrentUser = {
    isConnected: auth.isConnected,
    nom: auth.nom,
    prenom: auth.prenom,
    matricule: auth.matricule,
    role: auth.role,
  };

  const LogoutHandler = () => {
    dispatch(Logout(navigate));
  };

  const [form, setForm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [ville, setVille] = useState("");

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", form.email && form.email ? form.email : '');
    formdata.append("tel", form.tel && form.tel ? form.tel : '');
    formdata.append("pays", form.pays && form.pays ? form.pays : '');
    formdata.append("gouvernorat", form.gouvernorat && form.gouvernorat ? form.gouvernorat : '');
    formdata.append("ville", form.ville && form.ville ? form.ville : '');
    formdata.append("codepostal", form.codepostal && form.codepostal ? form.codepostal : '');
    formdata.append("adresse", form.adresse && form.adresse ? form.adresse : '');
    formdata.append("datenaiss", form.datenaiss && form.datenaiss ? form.datenaiss : '');

    formdata.append("avatar", avatar);
    dispatch(SetProfileAction(formdata, setShow, setMessage, navigate));
  };

  useEffect(() => {
    (() => {
      setTimeout(() => {
        setIsLoading(false);
      dispatch(GetProfileAction());
      }, 1000 );
    })();
  }, []);

  const [page, setPage] = useState(0);
  const FormTitles = ["Step 1", "Step 2", "Step 3", "Step 4"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <StepOne
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          setPage={setPage}
        />
      );
    } else if (page === 1) {
      return (
        <StepTwo
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          setPage={setPage}
        />
      );
    } else if (page === 2) {
      return (
        <StepFour
          avatar={avatar}
          setAvatar={setAvatar}
          onSubmit={onSubmit}
          setPage={setPage}
        />
      );
    } else {
      return <StepThree form={form} setForm={setForm} onSubmit={onSubmit} />;
    }
  };
  return (
    <div className="welcome_page">
       {isLoading ? <IsLoading /> :
      <><div className="welcome_progressbar1">
          <div
            className="welcome_progressbar"
            style={{
              width: page === 0
                ? "25%"
                : page === 1
                  ? "50%"
                  : page === 2
                    ? "75%"
                    : "100%",
            }}
          >
            <p>⠀</p>
          </div>
        </div><p></p><ul>

            <button className="welcome_logout" onClick={LogoutHandler}>
              <BiLogIn /> Se deconnecter
            </button>
          </ul><div className="welcome_card">
            <div className="welcome_card-image">
              <h2 className="welcome_card-heading">
                Bienvenue {CurrentUser.prenom} !
              </h2>
              <div className="welcome_step">{FormTitles[page]}</div>
            </div>
            <div className="welcome_card-form">{PageDisplay()}</div>

            <button
              className="welcome_button_previous"
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              } }
            >
              {" "}
              Précédent{" "}
            </button>

            <div className="welcome_card-info">
              <p className="welcome_p">
                Merci de bien vouloir remplir le formulaire.
              </p>
            </div>
          </div><p className="welcome_footer">Tous droits réservés - SoMezzo</p></>
        }
    </div>
        
  );
}

export default WelcomePage;
