import { Outlet } from "react-router-dom";
import {Link, Navigate} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Head from "../common/header/Head.jsx"
import React, { useState } from "react"
import '../common/header/header.css'
import { Avatar,TextField } from '@mui/material';

export default function DefaultLayout() {
    const [navbar, setNavbar] = useState(false)
    const {user, token, setUser, setToken, notification} = useStateContext();

    if (!token) {
      return <Navigate to="/login"/>
    }

    const onLogout = ev => {
        // ev.preventDefault()
      console.log("hassan")
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
              // to='/login'
          })
      }
    
      // useEffect(() => {
      //   axiosClient.get('/user')
      //     .then(({data}) => {
      //        setUser(data)
      //     })
      // }, [])
    return(
        <div >
            {/* <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside> */}
            <div className="content">
            <Head />
      <header>
        <div className='container paddingSmall'>
          <nav>
            <ul className={navbar ? "navbar" : "flex"} onClick={() => setNavbar(false)}>
              <li>
                <Link to='/dashboard'>Home</Link>
              </li>
              <li>
                <Link to='/culture'>Culture</Link>
              </li>
              <li>
                <Link to='/politics'>Politics</Link>
              </li>
              <li>
                <Link to='/memes'>Memes</Link>
              </li>
              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
              {/* <p className="auth">{user.name}</p> */}
              <div className='userData'>
                <p className="title">{<Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />}</p>
 

                </div>
                <a onClick={onLogout} className="btn-logout" href="#"style={{ float: 'right' }}>Logout</a>
            </ul>
            
            <button className='barIcon' onClick={() => setNavbar(!navbar)}>
              {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
        </div>
      </header>
                <main>
                <Outlet/>
                </main>
                {notification &&
                <div className="notification">
                    {notification}
                </div>
                }
            </div>
        </div>
    )
    }