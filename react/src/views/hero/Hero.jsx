import React, { useState } from "react"
import { hero } from "../../../dummyData"
import "./hero.css"
import Card from "./Card"
import {useEffect} from "react";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";


const Hero = () => {
  const [items, setIems] = useState(hero)
  const { setUser} = useStateContext();
  const [nytimesArticles, setNytimesArticles] = useState([]);
  const [guardianArticles, setguardianArticles] = useState([]);
  const [newsArticles, setnewsArticles] = useState([]);
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
            setNytimesArticles(response.data['nytimesArticles']);
            setguardianArticles(response.data['guardianArticles']);
            setnewsArticles(response.data['newsArticles']);
          })
          .catch(error => {
            console.error(error);
          });
      })
  }, [])

  const renderCardsInRows = () => {
    const rows = [];
    const cardsPerRow = 3;
    const totalCards = 21;
    let rowIndex = 0;
  
    while (rowIndex < totalCards+10) {
      const rowItems = newsArticles
        .slice(rowIndex, rowIndex + cardsPerRow)
        .map((item) => {
          // if (!item.urlToImage || !item.author) {
          //   return null; // Skip the post if urlToImage or author is missing
          // }
  
          return (
            <TableCell key={item.id}>
              <Card item={item} />
            </TableCell>
          );
        });
  
      if (rowItems.some((item) => item !== null)) {
        rows.push(<TableRow key={rowIndex}>{rowItems}</TableRow>);
      }
  
      rowIndex += cardsPerRow;
    }
    let rowIndex2 = 0;
    while (rowIndex2 < totalCards-10) {
      const rowItems = guardianArticles
        .slice(rowIndex2, rowIndex2 + cardsPerRow)
        .map((item) => {
          // if (!item.urlToImage || !item.author) {
          //   return null; // Skip the post if urlToImage or author is missing
          // }
  
          return (
            <TableCell key={item.id}>
              <Card item={item} />
            </TableCell>
          );
        });
  
      if (rowItems.some((item) => item !== null)) {
        rows.push(<TableRow key={rowIndex2}>{rowItems}</TableRow>);
      }
  
      rowIndex2 += cardsPerRow;
    }
  
    return rows;
  };
  
  
  
  
  return (
    <section className="hero">
      <TableContainer>
        <Table>
          <TableBody>
            {renderCardsInRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};


export default Hero
