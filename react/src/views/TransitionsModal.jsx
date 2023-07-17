import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import Modal from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/base/Button';
import './TransitionsModal.css'
var clicked = []
// export { clicked };
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

export default function TransitionsModal({ onClose }) {
  const [open, setOpen] = useState(true);
  const [buttonColors, setButtonColors] = useState(Array(11).fill('primary'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var preferences = ['Sports','Politics','Games','Valorant','Technology','Computer Science','Photography','Health','Travel','Books','Yoga']

  const [clickedIndex, setClickedIndex] = useState(null);

  const handleButtonClick = (index) => {
    if (!clicked.includes(index)) {
      setClickedIndex(index);
      clicked.push(preferences[index]);
      console.log(clicked)
    }
  };
  const handleModalClose = (selectedPreferences) => {
    onClose(selectedPreferences);
  };
  const handleHideModal = () => {
    handleModalClose(clicked);
    handleClose();
    setButtonColors(Array(5).fill('primary'));
  };

  return (
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id="transition-modal-title">Text in a modal</h2>
            <span id="transition-modal-description" style={{ marginTop: 16 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </span>
            <div style={{ marginTop: 16 }}>
            {buttonColors.map((color, index) => (
              <button
                key={index}
                variant="contained"
                className="custom-button"
                style={{
                  backgroundColor: index === clickedIndex ? '#ff0000' : '#323e40',
                  marginRight: 8
                }}
                onClick={() => handleButtonClick(index)}
              >
                {preferences[index]}
              </button>
            ))}
            </div>
            <button className="custom-button" variant="contained" color="primary" onClick={handleHideModal} style={{ backgroundColor: '#323e40',marginTop: 16 }}>
              Hide Modal
            </button>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}
TransitionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};