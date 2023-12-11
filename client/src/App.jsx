import { createContext, useEffect, useState } from "react"
import Router from "./router/Router";
import { useTranslation } from "react-i18next";
import { useLocalStorage, url } from './utils/index'

export const PopupContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { getItem } = useLocalStorage()

  const { i18n } = useTranslation();

  useEffect(()=>{
    const lang = getItem('lang')
    const theme = getItem('theme')

    lang ? i18n.changeLanguage(lang) : i18n.changeLanguage('en');

    if(theme === 'light'){
      setDarkMode(false);
    }else{
      setDarkMode(true);
    }

  }, [])
  
  return (
    <div className={`${ darkMode ? "dark" : ""} text-foreground bg-background w-full min-w-screen min-h-screen h-full bg-cover`}>
      <PopupContext.Provider value={{setDarkMode, darkMode, url}} >
        <Router/>
      </PopupContext.Provider>
    </div>
  )
}

export default App
