import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supprimerNews,listernews, addnews, Deletenews } from "../actions/news.actions";
import Navigation from "../components/navigation";
import "../assets/styles/news.css";
import divider from "../components/divider";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function NewsLetterPage() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(listernews());
  }, []);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateSuppression, setDateSuppression] = useState("");
  const [imgurl, setImgurl] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addnewsaction = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("titre", titre);
    data.append("description", description);
    data.append("dateSuppression",dateSuppression);
    data.append("imgurl", imgurl);

    await dispatch(addnews(data));
    await dispatch(listernews());
    handleClose();
    setTitre("");
    setDescription("");
    setDateSuppression("");
    setImgurl("");
  };
  const CurrentProfile = {
    isConnected: auth.isConnected,
    nom: auth.user.nom,
    prenom: auth.user.prenom,
    matricule: auth.user.matricule,
    role: auth.user.role,
    password: auth.user.password,
  };

  const deletenews = async () => {
    await dispatch(supprimerNews());
    await dispatch(listernews());
    await dispatch(listernews());
  };

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
            <Button  color="error" onClick={handleShow} size="small" sx={{width:"40%", textAlign:"center", margin:"0.5em -0.8em"}}>
              Ajouter une publication
            </Button>
          )}
              
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
                              color="error" variant="contained"
                              onClick={() => deletenews()}
                              size="small" sx={{ textAlign:"center", margin:"1em", backgroundColor:"orangered"}}
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
        </div>




        {/** pop up modal  add */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une publication </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titre de votre publication</Form.Label>
                <Form.Control
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Titre"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Déscription de votre publication</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Déscription"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ajouter une date de suppression </Form.Label>
                <Form.Control
                  type="date"
                  value={dateSuppression}
                  onChange={(e) => setDateSuppression(e.target.value)}
                  placeholder="date Suppression"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Charger une image pour votre publication</Form.Label>
                <Form.Control
                  type="file"
                  name="imgurl"
                  onChange={(e) => setImgurl(e.target.files[0])}
                />
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={addnewsaction}>
              Publier
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default NewsLetterPage;
