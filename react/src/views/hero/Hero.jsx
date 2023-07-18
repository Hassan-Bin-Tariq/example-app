import React, { useState } from "react"
import { hero } from "../../../dummyData"
import "./hero.css"
import Card from "./Card"
import {useEffect} from "react";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import axios from "axios";
import Search from "../../components/search"
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { BsSearch } from "react-icons/bs";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";


const Hero = () => {
  const [items, setIems] = useState(hero)
  const { setUser} = useStateContext();
  const [nytimesArticles, setNytimesArticles] = useState([]);
  const [guardianArticles, setguardianArticles] = useState([]);
  const [newsArticles, setnewsArticles] = useState([]);
  const [inputText, setInputText] = useState("");


  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
         console.log(data['preference'])
         const array = data['preference'].split(",");
         // Make another API call and send the user data back to the backend
          axios.post('http://localhost:8000/api/GetPreferedArticle', array) 
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
  
  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function fetchSearchData (){
    console.log(inputText)
    axios
      .post("http://localhost:8000/api/search", inputText)
      .then((response) => {
        console.log(response.data);
        setnewsArticles(response.data["newsArticles"]); // Update searchResult state
        setguardianArticles(response.data["guardianArticles"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleSearchClick = () => {
    console.log("Search icon clicked");
    fetchSearchData ();
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      fetchSearchData ();
    }
  };

  
  return (
    <section className="hero">
      <div className="main">
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                onKeyPress={handleEnterKeyPress}
                variant="outlined"
                fullWidth
                label="Search"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearchClick}>
                      <BsSearch size={15} color="red" />
                    </IconButton>
                  ),
                }}
              />
            </div>
        </div>
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
