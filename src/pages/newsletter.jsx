import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {listernews,addnews} from '../actions/news.actions'
import Navigation from "../components/navigation";
import "../assets/styles/news.css";


import divider from "../components/divider"

function NewsLetterPage() {

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
    <div className="news_page">
          <Navigation user={CurrentProfile} />
      <div className="news_container">

      <div className="page_name">
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

      </div>
        </div>    
        
  )
}

export default NewsLetterPage