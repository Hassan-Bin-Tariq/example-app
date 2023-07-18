import {createBrowserRouter, Navigate} from "react-router-dom";
// import Dashboard from "./Dashboard.jsx";
// import DefaultLayout from "./components/DefaultLayout";
// import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";
// import UserForm from "./views/UserForm";

const router = createBrowserRouter([


    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path:'/users',
                element:<Users/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/users/new',
                element:<UserForm key= "userCreate"/>
            },
            {
                path:'/users/:id',
                element:<UserForm key= "userUpdate"/>
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },

    {
        path: "*",
        element: <NotFound/>
    }
])

export default router;