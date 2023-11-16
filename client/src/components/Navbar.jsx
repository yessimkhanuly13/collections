import React, { useContext, useEffect, useState } from 'react'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar,  NavbarBrand, NavbarContent, NavbarItem, Button, Input} from "@nextui-org/react";
import { Link } from 'react-router-dom';


function NavbarComponent() {
  const {setDarkMode, darkMode} = useContext(PopupContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {url} = useContext(PopupContext);

  const navigate = useNavigate();

  const handleChange = (e) =>{
      axios.get(`${url}/search?q=${e.target.value}`)
      .then((res)=>{
        setSearchResults(res.data);
        console.log(res.data);
      })
      .catch((e)=>{console.log(e)})
      console.log(`${url}/search?q=${e.target.value}`)
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
  
    if(user && JSON.parse(user).roles.includes('admin')){
        setIsAdmin(true);
    }else{
        setIsAdmin(false)
    }
  },[])


  return (
    <Navbar>
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4">
        <Link to="/">
          <p className="hidden sm:block font-bold text-inherit">Collections</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent as="div" className="items-center" justify="center">
      <Input
        onChange={handleChange}
        placeholder="Type to search..."
        size="sm"
        type="search"
      />
    </NavbarContent>

    <NavbarContent justify="end">
        {
          !isLogged ? 
              (
                <NavbarItem className="flex">
                    <Button color="success" variant="shadow" onClick={()=>navigate('/login')}>
                        Sign In
                    </Button>
                </NavbarItem>
              ) : (
                  <NavbarItem className="flex">
                      <Button color="danger" variant="shadow" onClick={handleLogout}>
                          Log out
                      </Button>
                    </NavbarItem>
              )
        }
      </NavbarContent>

  </Navbar>
  );
  

  // return (
  //   <div className={darkMode ? 'grid grid-cols-1 md:flex justify-between p-4 bg-black shadow-md items-center' : 'grid grid-cols-1 md:flex justify-between p-4 bg-white shadow-md items-center'}>
  //      <div className="flex items-center">
  //         <span onClick={()=>navigate('/')} className={darkMode ? "text-xl font-bold text-white cursor-pointer" : "text-xl font-bold text-grey-800 cursor-pointer"}>Collections</span>
  //         {isLogged && (
  //                 <svg onClick={()=>navigate('/profile')} className='cursor-pointer ml-2 w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                 <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke={!darkMode ?"#292D32" : "#edf0f2"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  //                 <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke={!darkMode ?"#292D32" : "#edf0f2"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  //                 <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={!darkMode ?"#292D32" : "#edf0f2"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  //                 </svg>)}
  //       </div>

  //       <div className="w-1/4">
  //         <input
  //           type="text"
  //           placeholder="Search"
  //           className="w-full px-3 py-2 bg-inherit rounded-sm border border-gray border-rounded"
  //           onChange={handleChange}
  //         />
  //         <div className={darkMode ? 'absolute bg-black w-1/4 text-white' :'absolute bg-white w-1/4'}>{searchResults.map((item)=>{
  //           return (
  //             <div onClick={()=>navigate(`item/${item._id}`)} className={ !darkMode ? 'px-3 py-2 cursor-pointer hover:bg-slate-100' :'px-3 py-2 cursor-pointer hover:bg-slate-600'}>
  //               {item.topic ? item.topic : item.desc}
  //             </div>
  //           )
  //         })}
  //         </div>
  //       </div>

  //     <div className='flex'>

  //     <div onClick={toggleMode} className='cursor-pointer px-4 py-2'>
  //     <svg fill={!darkMode ? "#000000" : "#edf0f2"} className='w-6 h-6' width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  //       <title>dark-mode-solid</title>
  //       <g id="Layer_2" data-name="Layer 2">
  //         <g id="Icons">
  //           <g>
  //             <rect width="48" height="48" fill="none"/>
  //             <g>
  //               <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"/>
  //               <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"/>
  //             </g>
  //           </g>
  //         </g>
  //       </g>
  //     </svg>
  //     </div>

  //       {
  //         isLogged && isAdmin && (<div onClick={()=>navigate('/admin')} className='flex justify-center px-4 py-2 cursor-pointer'><svg className='w-6 h-6' fill={!darkMode ? "#000000" : "#edf0f2"} height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  //         viewBox="0 0 474.565 474.565" xml:space="preserve">
  //      <g>
  //        <path d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z"/>
  //        <path d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826
  //          C163.921,81.685,150.146,73.928,134.524,73.928z"/>
  //        <path d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383
  //          c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827
  //          c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715
  //          c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033
  //          c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004
  //          l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411
  //          c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359
  //          c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896
  //          L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403
  //          c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z"
  //          />
  //        <path d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168
  //          c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z
  //          "/>
  //        <path d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544
  //          c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138
  //          c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958
  //          c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552
  //          c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07
  //          c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684
  //          c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552
  //          c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555
  //          L460.782,276.588z"/>
  //        <path d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351
  //          c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013
  //          c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631
  //          c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z"/>
  //        <path d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603
  //          C285.563,81.188,120.842,80.939,120.842,206.782z"/>
  //      </g>
  //      </svg></div>)
  //       }
  //       {
  //         !isLogged ? (
  //           <div>
  //             <Button name="Sign In" style="bg-lime-600" onClick={()=>navigate('/login')}/>
  //           </div>
  //         ) : (
  //           <div  onClick={handleLogout} className='px-4 py-2 cursor-pointer'>
  //             <svg className='w-6 h-6' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //               <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" fill="#f00a15"/>
  //               <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" fill="#f00a15"/>
  //             </svg>
  //           </div>
  //         )
  //       }
  //     </div>
  //   </div>
  // )
}

export default NavbarComponent