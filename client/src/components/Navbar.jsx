import { useContext, useEffect, useState } from 'react'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar,  NavbarBrand, NavbarContent, NavbarItem, Button, Input, useDisclosure, Modal, ModalBody, ModalContent, ModalHeader, Listbox, ListboxItem, LinkIcon, Select, SelectItem} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { SearchIcon } from '../icons/SearchIcon';
import { DashboardIcon } from '../icons/DashboardIcon';
import { LightIcon } from '../icons/LightIcon';
import { DarkIcon } from '../icons/DarkIcon';
import { useTranslation } from "react-i18next";


function NavbarComponent() {
  const {setDarkMode, darkMode} = useContext(PopupContext);
  const [isLogged, setIsLogged] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false)

  const {url} = useContext(PopupContext);

  

  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  const changeLanguage = (lang) =>{
    localStorage.removeItem('lang');
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang)
  }

  const handleChange = (e) =>{
    console.log(searchResults)
      axios.get(`${url}/search?q=${e.target.value}`)
      .then((res)=>{
        setSearchResults([]);
        setSearchResults(res.data);
        console.log(res.data);
      })
      .catch((e)=>{console.log(e)})
  } 
  

  const toggleMode = () =>{
    if(darkMode){
      localStorage.setItem('theme', 'light');
    }else{
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  }

  const handleLogout = () =>{
    localStorage.removeItem('currentUser');
    setIsLogged(false);
    navigate('/');
  }
  
  useEffect(()=>{
    const user = localStorage.getItem('currentUser');

    if(user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }


  },[])

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Navbar>
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4">
        <Link to="/">
          <p className="text-xl hidden sm:block font-bold text-inherit">{t('navbar.header')}</p>
        </Link>
        <Link to="/">
          <DashboardIcon className="ml-2" fill={`${darkMode ? "#f8fafc" : ""}`}/>
        </Link>
      </NavbarBrand>
      <NavbarItem className="flex md:hidden">
              <Select
                className="max-w-l w-16"
                label={t('lang')}
                selectionMode="single"
                onOpenChange={setOpen}
                onChange={(e)=>changeLanguage(e.target.value)}
                selectedKeys={[t('defaultLang')]}
              >
                <SelectItem key="en" value="en" className="capitalize">
                  En
                </SelectItem>
                <SelectItem key="ru" value="ru" className="capitalize">
                  Ру
                </SelectItem>
                    
              </Select>
        </NavbarItem>
    </NavbarContent>
    
    <NavbarContent justify="center">
    <NavbarItem className='text-slate-400'>
      <Button
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          onPress={onOpen}
          onClick={()=>setSearchResults([])}
          variant='faded'
        >{t('navbar.search')}</Button>
        </NavbarItem>
    </NavbarContent>

      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          body: `${darkMode ? "dark" : ""} text-foreground bg-background`,
          header: `${darkMode ? "dark" : ""}  text-foreground bg-background`,
          footer: `${darkMode ? "dark" : ""} text-foreground bg-background`,
          base: `${darkMode ? "dark" : ""} text-foreground bg-background`
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('search.search')}</ModalHeader>
              <ModalBody className='mb-5'>
              <Input
                  autoFocus
                  endContent={
                    <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  placeholder={t('search.type')}
                  onChange={handleChange}
                />
                  <Listbox 
                    emptyContent={t('search.empty')}
                  >
                    {searchResults && searchResults.map((item, index)=>{
                      return (
                        <ListboxItem key={`${item._id}-${index}`}>
                              <div onClick={()=>navigate(`/item/${item._id}`)} className='grid grid-cols-3 gap-1'>
                                <span className='text-l'>
                                  {item.topic ? item.topic : item.desc ? item.desc : item.customField1_value ? item.customField1_value : item.customField2_value ? item.customField2_value : item.customField3_value}
                                </span>
                                <span className='text-l'>{item.topic ? t('navbar.topic') : item.desc ? t('navbar.desc') : t('navbar.custom_field') }</span>
                                <div className='flex justify-end'>
                                  <LinkIcon/>
                                </div>
                              </div>
                        </ListboxItem>
                      )
                    })}
                  </Listbox>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

    <NavbarContent justify="end">
      <NavbarItem className="hidden md:flex">
              <Select
                className="max-w-l w-20"
                label={t('lang')}
                selectionMode="single"
                onOpenChange={setOpen}
                onChange={(e)=>changeLanguage(e.target.value)}
                selectedKeys={[t('defaultLang')]}
              >
                <SelectItem key="en" value="en" className="capitalize">
                  En
                </SelectItem>
                <SelectItem key="ru" value="ru" className="capitalize">
                  Ру
                </SelectItem>
                    
              </Select>
        </NavbarItem>
        {darkMode ? (
          <NavbarItem className="flex">
            <DarkIcon className="cursor-pointer" fill="#f8fafc" onClick={toggleMode}/>
          </NavbarItem>
          ) : (
          <NavbarItem className="flex">
            <LightIcon className="cursor-pointer" onClick={toggleMode}/>
          </NavbarItem>
          )
        }

        {
          !isLogged ? 
              (
                <NavbarItem className="flex">
                    <Button color="success" variant="shadow" onClick={()=>navigate('/login')}>
                        {t('buttons.signin')}
                    </Button>
                </NavbarItem>
              ) : (
                  <NavbarItem className="flex">
                      <Button color="danger" variant="shadow" onClick={handleLogout}>
                        {t('buttons.logout')}
                      </Button>
                    </NavbarItem>
              )
        }
      </NavbarContent>

  </Navbar>
  )
}

export default NavbarComponent