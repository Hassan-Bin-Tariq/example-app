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
import { LuSettings2 } from 'react-icons/lu';
import SimpleModal from "../../components/SimpleModal"
var startDate;
var endDate ;
var articleSource;
const Hero = () => {
  const { setUser} = useStateContext();
  const [nytimesArticles, setNytimesArticles] = useState([]);
  const [guardianArticles, setguardianArticles] = useState([]);
  const [newsArticles, setnewsArticles] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setFilter] = useState(false);

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


  
  const renderCardsInRows = (checker) => {
    const rows = [];
    const cardsPerRow = 3;
    const totalCards = 21;
    let rowIndex = 0;

    if(showFilter === false)
    {
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
    }
    else if (showFilter === true)
    {

            while (rowIndex < totalCards + 10) {
              const rowItems = newsArticles
                .slice(rowIndex, rowIndex + cardsPerRow)
                .filter((item) => {
                  //console.log(articleSource,item.source)
                  var startDateObj = new Date(startDate);
                  var endDateObj = new Date(endDate);
                  var publishedAtObj = new Date(item.published_at || item.webPublicationDate);
                  //const itemDate = new Date(item.published_at || item.webPublicationDate);
                  return publishedAtObj >= startDateObj && publishedAtObj <= endDateObj || (!articleSource || item.source === articleSource);
                })
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
            while (rowIndex2 < totalCards - 10) {
              const rowItems = guardianArticles
                .slice(rowIndex2, rowIndex2 + cardsPerRow)
                .filter((item) => {
                  var startDateObj = new Date(startDate);
                  var endDateObj = new Date(endDate);
                  var publishedAtObj = new Date(item.published_at || item.webPublicationDate);
                  //const itemDate = new Date(item.published_at || item.webPublicationDate);
                  return publishedAtObj >= startDateObj && publishedAtObj <= endDateObj;
                })
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
          };
      
    
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
        setnewsArticles(response.data["newsArticles"]); 
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

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDateChange = (date) => {

      if(date){
        //console.log(date.length)
        setFilter(true);
        var start = JSON.stringify(date[0]['$d'])
        if(date[1]){

          var end = JSON.stringify(date[1]['$d'])
          startDate = start.substring(1, 11)
          endDate = end.substring(1, 11)
      }
    };
  }
  const handleSourceChange = (Source) => {

    if(Source){
      console.log(Source)
      articleSource = Source
      setFilter(true);
    }
  };

  
  return (
    <section className="hero">
    <div className="filter" style={{ marginLeft: '200px', marginTop: '100px'}}>
      <h3>
        <LuSettings2 size={35} color="red" onClick={handleModalOpen} />
        <SimpleModal open={showModal} handleClose={handleModalClose} handleDate={handleDateChange} handleSource={handleSourceChange}/>
        <br />
        <span>Filter data </span>
      </h3>
    </div>
      <div className="main">
            <div className="search">
              <TextField
                id="outlined-basic"
                autoComplete="off"
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
          {renderCardsInRows(0)}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};


export default Hero
