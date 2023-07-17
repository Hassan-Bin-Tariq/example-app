import React from "react"
import Discover from "./discover/Discover"
import Hero from "./hero/Hero"
import Homes from "./mainContent/homes/Home"
import {useEffect, useState} from "react";
import './Dashboard.css'
import axiosClient from "../axios-client.js";
function Dashboard() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

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
  function NY(){
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
      <button onClick={OpenNews}>OpenNewssss</button>
      <button onClick={Guardian}>The Guardian</button>
      <button onClick={NY}>clear</button>
    </div>
  )
}

export default Dashboard
