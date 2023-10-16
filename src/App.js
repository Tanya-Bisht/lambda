import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Components/login';
import Dashboard from './Components/dashboard';
import axios from 'axios';


function App() {

  const [isLoading,setIsLoading] = useState(true)
  const [isLoggedIn,setIsLoggedIn] = useState(false)


  


      useEffect(() => {

        console.log("App.js")
       
        const config = {
          headers: {
              'Authorization': localStorage.getItem("token") || "token",
              'Origin': 'http://localhost:3000' 
            }
        }
      
        axios.post('https://962a423kyh.execute-api.ap-south-1.amazonaws.com/dev/user/auth',{},config)
            .then((response) => {
              setIsLoading(false)
              setIsLoggedIn(true)
          console.log(response)
            })
            .catch((error) => {
              // Handle an error
              console.log("error",error)
              localStorage.removeItem("token")
              setIsLoading(false)
              setIsLoggedIn(false)
      
            });

    }, []);

  return (
    <BrowserRouter>
      {
        !isLoading && !isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />
      }
      {
        isLoading && <>Loading....</>
      }
      <Routes>
        <Route path='/' element={isLoggedIn && <Dashboard setIsLoggedIn={setIsLoggedIn} />}/>
        <Route element={<>no route</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App