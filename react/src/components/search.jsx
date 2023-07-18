import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import "./search.css";

function Search() {
  const [inputText, setInputText] = useState("");
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchResult, setSearchResult] = useState([]); // Add searchResult state

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleSearchClick = () => {
    console.log("Search icon clicked");
    axios
      .post("http://localhost:8000/api/GetPreferedArticle", ["games"])
      .then((response) => {
        console.log(response.data);
        setSearchResult(response.data["guardianArticles"]); // Update searchResult state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  return (
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
      {/* <List input={inputText} /> */}
    </div>
  );
}

export default Search;
