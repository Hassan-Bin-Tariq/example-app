import { Link } from "react-router-dom";
import { createRef, useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import TransitionsModal from './TransitionsModal';
// import { clicked } from './TransitionsModal';

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false); // Add state variable
  const [clicked, setClicked] = useState([]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setShowModal(true); // Show the transition modal
    
  };
  const handleModalClose = (selectedPreferences) => {
 
    setShowModal(false);
    setClicked(selectedPreferences);
    console.log(selectedPreferences);
    const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
          preference: selectedPreferences.toString(),
    };

    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
      .finally(() => {
        setShowModal(false); // Hide the transition modal
      });
  };
  return (
    <div>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Signup for Free</h1>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email Address" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
              ref={passwordConfirmationRef}
              type="password"
              placeholder="Repeat Password"
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
        {showModal && <TransitionsModal onClose={handleModalClose} />}
      </div>
    </div>
  );
}
