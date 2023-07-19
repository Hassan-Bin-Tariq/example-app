import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Calender from "./Calender"
import { useState } from "react"
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SimpleModal = ({ open, handleClose,handleDate,handleSource }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [inputText, setInputText] = useState("");
    handleDate(selectedDate);
    handleSource(inputText);
    //console.log(selectedDate);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const setText = (e) => {
        //var lowerCase = e.target.value.toLowerCase();
        setInputText(e.target.value);
    };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={style}>
        <Typography id="simple-modal-title" variant="h6" component="h2">
            Set Filters According to your need
        </Typography>
        <Calender handleDateChange={handleDateChange} />
        <br/>
        <input placeholder='Enter source' onChange={setText}></input>
        {/* <Typography id="simple-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
      </Box>
    </Modal>
  );
};

export default SimpleModal;
