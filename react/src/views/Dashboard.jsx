import React from "react"
import Discover from "./discover/Discover"
import Hero from "./hero/Hero"
import Homes from "./mainContent/homes/Home"
import Footer from "../common/footer/Footer"
import Calendar  from "../components/Calender"

import './Dashboard.css'

function Dashboard() {

  return (
    <div >

      <Hero />
      <Homes />
      <Discover />
      <Footer/>
      <Calendar/>

    </div>
  )
}

export default Dashboard
