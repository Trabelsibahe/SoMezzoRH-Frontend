import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import Classnames from "classnames";
import { Box, Modal } from "@mui/material";

import {
  listernews,
  addnews,
  Deletenews,
  supprimerNews,
} from "../actions/news.actions";
import {
  SendNotificationToAll,
  SendNotificationToOneUser,
} from "../actions/notification.action";
import Navigation from "../components/navigation";
import "../assets/styles/news.css";
import divider from "../components/divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #151582",
  boxShadow: 24,
  p: 4,
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
};

function NewsLetterPage() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const [loading, setLoading] = useState(false); // New loading state
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);

  const notification = {
    message: "Une nouvelle news a été ajoutée.",
  };
  // ...

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(listernews());
      setLoading(false);
    };

    fetchData();
  }, []);

  // ...

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(supprimerNews());
      setLoading(false);
    };

    fetchData();
  }, []);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateSuppression, setDateSuppression] = useState("");
  const [imgurl, setImgurl] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");

  const addnewsaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("imgurl", imgurl);
    data.append("titre", titre);
    data.append("description", description);
    data.append("dateSuppression", dateSuppression);
    if (
      imgurl === "" ||
      titre === "" ||
      description === "" ||
      dateSuppression === ""
    ) {
      await dispatch(addnews(data));
    } else {
      await dispatch(addnews(data));
      await dispatch(SendNotificationToAll(notification));
      await dispatch(listernews());
      await handleClose();
      setImgurl("");
      setDateSuppression("");
      setDescription("");
      setTitre("");
    }
    setLoading(false); // Set loading to false after fetching data
  };

  const deletenewsaction = async (id) => {
    await dispatch(Deletenews(id));
    await dispatch(listernews());
    await dispatch(listernews());
  };

  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    password: auth.user.password,
    active: auth.user.active,
  };

  if (CurrentProfile.active === false) {
    return <Navigate to="/inactive" />;
  }

  return (
    <div className="news_page">
      <Navigation user={CurrentProfile} />
      <div className="news_container">
        <div className="page_name">
          Pages / Acceuil{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>Newsletter</p>
        </div>
        <div className="news_body">
          <h5>Quoi de neuf ? </h5>
          <hr className="news_hr" />
          {CurrentProfile.role === "EXPERT" && (
            <Button
              color="error"
              onClick={handleShow}
              size="small"
              sx={{ width: "40%", textAlign: "center", margin: "0.5em -0.8em" }}
            >
              Ajouter une publication
            </Button>
          )}

          {loading ? (
            <div className="loading_spinner">
              <CircularProgress />
            </div>
          ) : (
            <>
              {news && news.length > 0
                ? news.map((newsItem, index) => (
                    <div className="news_content">
                      <div className="news_card">
                        <div key={index} className="news_item">
                          <Card className="news_item_card">
                            <Card.Img
                              variant="top"
                              src={`http://localhost:3030/${newsItem?.imgurl}`}
                            />
                            <Card.Body>
                              <Card.Title>{newsItem.titre}</Card.Title>
                              <Card.Text>{newsItem.description}</Card.Text>
                            </Card.Body>
                          </Card>
                          {CurrentProfile.role === "EXPERT" && (
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => deletenewsaction(newsItem._id)}
                              size="small"
                              sx={{
                                textAlign: "center",
                                margin: "1em",
                                backgroundColor: "orangered",
                              }}
                            >
                              supprimer
                            </Button>
                          )}
                        </div>
                      </div>
                      <hr className="news_hr" />
                    </div>
                  ))
                : "Aucune newsletter trouvée..."}
            </>
          )}
        </div>

        {/** pop up modal  add */}
        <Modal open={show} onHide={handleClose}>
          <form className="news_form">
            <Box sx={style}>
              <p className="task_add_name">Ajouter une newsletter</p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Titre"
                  className={Classnames("w-100", {
                    "is-invalid": errors.titre,
                  })}
                />
                {errors.titre && (
                  <div className="invalid-feedback">{errors.titre}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Déscription</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Déscription"
                  className={Classnames("w-100", {
                    "is-invalid": errors.description,
                  })}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Date d'expiration</Form.Label>
                <Form.Control
                  type="date"
                  value={dateSuppression}
                  onChange={(e) => setDateSuppression(e.target.value)}
                  placeholder="date Suppression"
                  className={Classnames("w-100", {
                    "is-invalid": errors.dateSuppression,
                  })}
                  disablePast
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.dateSuppression && (
                  <div className="invalid-feedback">
                    {errors.dateSuppression}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Charger une image pour votre newsletter.
                </Form.Label>
                <Form.Control
                  type="file"
                  name="imgurl"
                  onChange={(e) => setImgurl(e.target.files[0])}
                  className={Classnames("w-100", {
                    "is-invalid": errors.imgurl,
                  })}
                />
                {errors.imgurl && (
                  <div className="invalid-feedback">{errors.imgurl}</div>
                )}
              </Form.Group>
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              <Button variant="outlined" onClick={handleClose}>
                Annuler
              </Button>{" "}
              <Button variant="outlined" onClick={addnewsaction}>
                Publier
              </Button>
            </Box>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default NewsLetterPage;
