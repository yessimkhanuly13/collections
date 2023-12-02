import { createContext, useEffect, useState } from "react"
import Router from "./router/Router";
import { useTranslation } from "react-i18next";
import { THEME, LANG, url, CURRENT_USER } from './const/index'

export const PopupContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const { i18n, t } = useTranslation();

  useEffect(()=>{
    LANG ? i18n.changeLanguage(LANG) : i18n.changeLanguage('en');

    if(THEME === 'light'){
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
