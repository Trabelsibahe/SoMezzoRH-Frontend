import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listernews,addnews} from '../actions/news.actions'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Navigation from "../components/navigation";
import "../assets/styles/news.css";

function NewsLetterPage() {
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
        }}
    />
);
  const dispatch = useDispatch(); 
    const news = useSelector(state => state.news.news)
    const auth = useSelector((state) => state.auth);
    useEffect(()=>{dispatch(listernews())},[])
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const CurrentProfile = {
    isConnected: auth.isConnected,
    name: auth.user.utilisateur,
    matricule: auth.user.matricule,
    role: auth.user.role,
    password : auth.user.password,
  };
  return (
    <div><Navigation user={CurrentProfile} />
    <div className="news_page">
      <div className="news_container">
            <div className="news_container">
      {news && news.length > 0 ? (
        news.map((newsItem, index) => (
          <div key={index} className="news_item">
          <Card className="news_item_card">
            <Card.Img variant="top" src={`http://localhost:3030/${newsItem?.imgurl}`} />
            <Card.Body>
              <Card.Title>{newsItem.titre}</Card.Title>
              <Card.Text>{newsItem.description}</Card.Text>
            </Card.Body>
          </Card>
          <ColoredLine color="blue" />

          </div>
        ))
      ) : (
        'Aucune newsletter trouvée...'
      )}
        </div>    
        </div>
        </div>
    </div>
  )
}

export default NewsLetterPage