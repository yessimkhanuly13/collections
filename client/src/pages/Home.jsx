import React from 'react'
import Navbar from "../components/Navbar"


function Home() {

    const handleChange = (e) =>{
        console.log(e.target.value);
    }

    const handleClick = () =>{
        console.log("Clicked")
    }

  return (
    <div>
       <Navbar/>
    </div>
  )
}

export default Home