import React, { useState } from "react"
import { hero } from "../../../dummyData"
import "./hero.css"
import Card from "./Card"
import {useEffect} from "react";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import axios from "axios";

const Hero = () => {
  const [items, setIems] = useState(hero)
  const { setUser} = useStateContext();
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
         console.log(data['preference'])
         const array = data['preference'].split(",");
         // Make another API call and send the user data back to the backend
          axios.post('http://localhost:8000/api/GetPreferedArticle', array) // Assuming your Laravel API endpoint for saving the user data is '/api/save-user'
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
  }, [])
  return (
    <>
      <section className='hero'>
        <div className='container'>
          {items.map((item) => {
            return (
              <>
                <Card key={item.id} item={item} />
              </>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Hero
