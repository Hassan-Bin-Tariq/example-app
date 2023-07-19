import React from "react"
import Discover from "./discover/Discover"
import Hero from "./hero/Hero"
import Homes from "./mainContent/homes/Home"
import Footer from "../common/footer/Footer"
import Calendar  from "../components/Calender"

import './Dashboard.css'

function Dashboard() {

  function OpenNews(){
    fetch("http://localhost:8000/api/OpenNews")
    .then(res => res.json()) // Convert the response to JSON
    .then(data => console.log(data))
    .catch(error => {
      console.error("Error:", error);
    });
  }
  function Guardian(){
    fetch("http://localhost:8000/api/Guardian")
    .then(res => res.json()) // Convert the response to JSON
    .then(data => console.log(data))
    .catch(error => {
      console.error("Error:", error);
    });
  }
  function NY(){
    fetch("http://localhost:8000/api/NYtimes")
    .then(res => res.json()) // Convert the response to JSON
    .then(data => console.log(data))
    .catch(error => {
      console.error("Error:", error);
    });
  }
  function clear(){
    fetch("http://localhost:8000/api/clear")
    .then(res => res.json()) // Convert the response to JSON
    .then(data => console.log(data))
    .catch(error => {
      console.error("Error:", error);
    });
  }
  return (
    <div >

      <Hero />
      <Homes />
      <Discover />
      <Footer/>
      <Calendar/>
      {/* <button onClick={OpenNews}>OpenNewssss</button>
      <button onClick={Guardian}>The Guardian</button>
      <button onClick={clear}>clear</button> */}
    </div>
  )
}

export default Dashboard
