import React from "react"
import { Link } from "react-router-dom"
import './Card.css'
import { BiCommentDetail } from 'react-icons/bi';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import { MdIosShare } from 'react-icons/md';
import { BsFillFuelPumpFill } from 'react-icons/bs';

const Card = ({ item }) => {
  return (//webPublicationDate
    <>
      <div class="card">
      <div class="imgBx">
      <img src={item.urlToImage ? item.urlToImage : 'https://cdn.icon-icons.com/icons2/1675/PNG/512/3890930-announce-horn-megaphone-news-trumpet_111179.png'}></img>


      </div>
      <div class="content">
        <div class="details">
          <h2 className="title">{item.title ? item.title : item.web_title}<br /><span className="auth">by {item.author?item.author : item.sectionName}</span></h2>
          <h5>
            {item.published_at ? item.published_at.substring(0, 10) : item.webPublicationDate.substring(0, 10)}
            <br />
          </h5>
          <div class="data">
            <h3><BsFillBalloonHeartFill size={15} color="red" /><br /><span>Like</span></h3>
            <h3><BiCommentDetail size={15} color="red" /><br /><span>Comment</span></h3>
            <h3><MdIosShare size={15} color="red" /><br /><span>Share</span></h3>
          </div>
          <div class="actionBtn">
            <button>Read more</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Card
