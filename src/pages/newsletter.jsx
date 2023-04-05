import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listernews,addnews,Deletenews} from '../actions/news.actions'
import Navigation from "../components/navigation";
import "../assets/styles/news.css";
import divider from "../components/divider"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function NewsLetterPage() {

  const dispatch = useDispatch(); 
  const news = useSelector(state => state.news.news)
  const auth = useSelector((state) => state.auth);
  useEffect(()=>{dispatch(listernews())},[])

const [ titre, setTitre ] = useState('');
const [ description, setDescription ] = useState('');
const [imgurl, setImgurl] = useState('');

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  
const addnewsaction = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('titre', titre);
  data.append('description', description);
  data.append('imgurl', imgurl);

  await dispatch(addnews(data));
  await dispatch(listernews());
  handleClose();
  setTitre('');
  setDescription('');
  setImgurl('');
};
const CurrentProfile = {
  isConnected: auth.isConnected,
  nom: auth.user.nom,
  prenom: auth.user.prenom,
  matricule: auth.user.matricule,
  role: auth.user.role,
  password : auth.user.password,
};

const deletenews = async (id) =>{
  await dispatch(Deletenews(id))
  await dispatch(listernews())
  await dispatch(listernews())
}
  return (
    <div className="news_page">
          <Navigation user={CurrentProfile} />
      <div className="news_container">

      <div className="page_name">
      {CurrentProfile.role === "EXPERT" && (  <Button onClick={handleShow}>Ajouter</Button>)}
          Pages / Acceuil{" "}
          <p style={{ fontWeight: "bold", fontSize: "14px" }}>
            Newsletter
          </p>
          
        </div>
        <div className='news_body'>
          <h5>Quoi de neuf ? </h5>
          <hr className='news_hr'/>
          {news && news.length > 0 ? (news.map((newsItem, index) => (
          <div className='news_content'>
        <div className='news_card'>
          <div key={index} className="news_item">
          <Card className="news_item_card">
            <Card.Img variant="top" src={`http://localhost:3030/${newsItem?.imgurl}`} />
            <Card.Body>
              <Card.Title>{newsItem.titre}</Card.Title>
              <Card.Text>{newsItem.description}</Card.Text>
              {CurrentProfile.role === "EXPERT" && ( <Button onClick={() => deletenews(newsItem._id)}>supprimer</Button>)}
            </Card.Body>
          </Card>

          </div>
          </div>
          <hr className='news_hr' />

      </div>
      
        ))
      ) : (
        'Aucune newsletter trouvée...'
      )}
  
      </div>
 {/** pop up add */}
 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un news</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>titre</Form.Label>
              <Form.Control type="text" value={titre} onChange={e => setTitre(e.target.value)} placeholder="Enter titre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="numero" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>image</Form.Label>
  <Form.Control type="file" name="imgurl" onChange={(e) => setImgurl(e.target.files[0])} />
</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addnewsaction}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
        </div>    
        
  )
}

export default NewsLetterPage