import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import Classnames from "classnames";
import { Box, CircularProgress, Modal, Skeleton } from "@mui/material";
import Navigation from "../components/navigation";
import "../assets/styles/news.css";
import test from "../assets/images/banner.avif";
import somezzologo from "../assets/images/icone.png";
import logoblanc from "../assets/images/logo_blanc.png";
import wallpaper from "../assets/images/wallpaper.jpg";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { listernews, addnews, Deletenews, supprimerNews, } from "../actions/news.actions";
import { SendNotificationToAll, SendNotificationToOneUser, } from "../actions/notification.action";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component
import NotFoundPage from "./notfound";
import IsLoading from "../components/isLoading";
import SplashScreen from "./intro";

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
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const [isLoading, setIsLoading] = useState(true);

  const notification = {
    message: "Une nouvelle news a été ajoutée.",
  };

  useEffect(() => {
    (() => {
        setIsLoading(false);
        dispatch(listernews());
    })();
  }, []);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateSuppression, setDateSuppression] = useState("");
  const [imgurl, setImgurl] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");

  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    password: auth.user.password,
    active: auth.user.active,
  };

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
    setLoading(false);
  };

  const deletenewsaction = async (id) => {
    await dispatch(Deletenews(id));

  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(supprimerNews());
    };

    fetchData();
  }, []);

  return (
    <div className="news_page">
             {isLoading ? <IsLoading /> :
      <><Navigation user={CurrentProfile} /><div className="news_container">
          <div className="news_body">

            {news && news.length > 0 ? (
              <Carousel showArrows={true} showThumbs={false} width="1210px" infiniteLoop>
                {news.map((newsItem, index) => (
                  <div className="news_content" key={index}>
                    <span className="news_header">
                      <img style={{ width: "100px", minHeight: "100px" }} src={logoblanc} alt=""></img>

                      {CurrentProfile.role === "EXPERT" ? <Button variant="outlined" color="secondary" size="small" startIcon={<AddBoxOutlinedIcon />} sx={{ color: "white" }}
                        onClick={handleShow}>Ajouter</Button> : ""}
                    </span>

                    <div className="news_text">
                      <h1>{newsItem.titre}</h1>
                      <p>{newsItem.description}</p>
                      {CurrentProfile.role === "EXPERT" ? <Button
                        startIcon={<DeleteOutlineIcon />}
                        sx={{ color: "white" }}
                        onClick={() => deletenewsaction(newsItem._id)}>
                        Supprimer
                      </Button> : ""}
                    </div>

                    <div className="news_image">
                      {newsItem?.imgurl ?
                        <Card.Img style={{
                          padding: "1em",
                          borderTopLeftRadius: "50%",
                          borderBottomLeftRadius: "20%",
                          borderBottomRightRadius: "45%",
                          borderTopRightRadius: "30%",
                          border: "4px solid #ebf0f7",
                          maxHeight: "450px",
                          minHeight: "450px", transition: "opacity 0.5s ease",
                        }} variant="top"
                          src={`http://localhost:3030/${newsItem?.imgurl}`} /> :
                        (<Card.Img className="CardImg"
                          style={{
                            padding: "1em",
                            borderTopLeftRadius: "50%",
                            borderBottomLeftRadius: "20%",
                            borderBottomRightRadius: "45%",
                            borderTopRightRadius: "30%",
                            border: "4px solid #ebf0f7",
                            maxHeight: "450px"
                          }}
                          variant="top"
                          src={wallpaper} />)}
                    </div>
                  </div>

                ))}
              </Carousel>
            ) : (

              <div className="news_content">
                <span className="news_header">
                  <img style={{ width: "100px", minHeight: "100px" }} src={logoblanc} alt=""></img>
                  {CurrentProfile.role === "EXPERT" ?
                    <Button variant="outlined" color="secondary" size="small" startIcon={<AddBoxOutlinedIcon />} sx={{ color: "white" }}
                      onClick={handleShow}>Ajouter</Button> : ""} </span>

              </div>

            )}
          </div>
          <div className="newsletter_footer">
            <p>Tous droits réservés - SoMezzo</p>
            <img src={somezzologo} alt="logo"></img>
          </div>
        </div>
          
      {/** pop up modal  add */}
      <Modal open={show} onClose={handleClose}>
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
</>}
    </div>
  
);
}

export default NewsLetterPage;
