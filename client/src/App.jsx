import { createContext, useEffect, useState } from "react"
import Popup from "./components/Popup"
import Router from "./router/Router";

export const PopupContext = createContext();

function App() {
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);


  const url = import.meta.env.VITE_URL;

  useEffect(()=>{
    const mode = localStorage.getItem('theme');

    if(mode === 'light'){
      setDarkMode(false);
    }else{
      setDarkMode(true);
    }

  }, [])
  
  return (
    <div className={`${ darkMode ? "dark" : ""} text-foreground bg-background w-full min-w-screen min-h-screen h-full bg-cover`}>
      <PopupContext.Provider value={{message, setMessage, setDarkMode, darkMode, url}} >
        {message && <Popup message={message} handleCloseError={()=>setMessage('')} darkMode={darkMode}/>}
        <Router/>
      </PopupContext.Provider>
    </div>
  )
}

export default App
