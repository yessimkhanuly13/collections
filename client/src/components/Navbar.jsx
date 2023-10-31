import React, { useContext, useEffect, useState } from 'react'
import Input from '../utils/Input'
import Button from '../utils/Button'
import { Error } from '../App';

function Navbar() {
  const [btnText, setBtnText] = useState('Light Mode');
  const {setDarkMode, darkMode} = useContext(Error);


  const toggleMode = () =>{
    if(darkMode){
      setBtnText('Light Mode');
    }else{
      setBtnText('Dark Mode');
    }
    setDarkMode(!darkMode);
  }
  

  return (
    <div className='flex justify-between'>
      <Input name="Search" type="text" />
      <Button style="bg-black" name={btnText} onClick={toggleMode}/>
    </div>
  )
}

export default Navbar