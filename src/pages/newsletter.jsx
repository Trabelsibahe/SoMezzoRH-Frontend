import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import Classnames from "classnames";
import { Box, Modal } from "@mui/material";
import image from "../assets/images/banner.avif"
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

  useEffect(() => {
    const el = document.querySelector('.slider');
    const slides = Array.from(el.querySelectorAll('li'));
    const nav = Array.from(el.querySelectorAll('nav a'));
    const totalSlides = slides.length;
    let current = 0;
    let autoPlay = true;
    const timeTrans = 4000;
    const indexElements = [];

    for (let i = 0; i < totalSlides; i++) {
      indexElements.push(i);
    }

    const setCurret = () => {
      slides[current].classList.add('current');
      nav[current].classList.add('current_dot');
    };

    const changeSlide = (index) => {
      nav.forEach((allDot) => allDot.classList.remove('current_dot'));

      slides.forEach((allSlides) =>
        allSlides.classList.remove('prev', 'current')
      );

      const getAllPrev = (value) => value < index;

      const prevElements = indexElements.filter(getAllPrev);

      prevElements.forEach((indexPrevEle) =>
        slides[indexPrevEle].classList.add('prev')
      );

      slides[index].classList.add('current');
      nav[index].classList.add('current_dot');
    };

    const initEvents = () => {
      nav.forEach((dot) => {
        dot.addEventListener('click', (ele) => {
          ele.preventDefault();
          changeSlide(nav.indexOf(dot));
        });
      });

      el.addEventListener('mouseenter', () => (autoPlay = false));
      el.addEventListener('mouseleave', () => (autoPlay = true));

      setInterval(() => {
        if (autoPlay) {
          current = current < slides.length - 1 ? current + 1 : 0;
          changeSlide(current);
        }
      }, timeTrans);
    };

    setCurret();
    initEvents();
  }, []);

  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const [loading, setLoading] = useState(false); // New loading state
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);

  const notification = {
    message: "Une nouvelle news a été ajoutée.",
  };

  
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateSuppression, setDateSuppression] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <section className="intro">
      <div className="left">
        <div>
          <span>Explore</span>
          <h1>The Places Where You Will</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            eveniet amet excepturi voluptates dolorem totam ad quod hic, porro
            accusamus, repellat, corrupti at obcaecati ducimus, dolor quibusdam
            sequi nemo inventore?
          </p>
          <a href="https://unsplash.com/" target="_blank">
            Images by Unsplash
          </a>
        </div>
      </div>

      <div className="slider">
        <ul>
          <li
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1458640904116-093b74971de9?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)',
            }}
          >
            <div className="center-y">
              <h3>Slider Title #1</h3>
              <a href="#">View Project</a>
            </div>
          </li>
          <li
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1451906278231-17b8ff0a8880?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)',
            }}
          >
            <div className="center-y">
              <h3>Slider Title #2</h3>
              <a href="#">View Project</a>
            </div>
          </li>
          <li
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)',
            }}
          >
            <div className="center-y">
              <h3>Slider Title #3</h3>
              <a href="#">View Project</a>
            </div>
          </li>
        </ul>

        <ul>
          <nav>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </nav>
        </ul>
      </div>
    </section>
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
