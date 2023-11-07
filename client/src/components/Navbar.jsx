import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import { PopupContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png'
import logout from '../assets/logout.png'
import userGear from '../assets/user-gear.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import axios from 'axios';


function Navbar() {
  const [btnText, setBtnText] = useState('Light Mode');
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
  } 
  

  const toggleMode = () =>{
    if(darkMode){
      localStorage.setItem('theme', 'light');
      setBtnText('Light Mode');
    }else{
      localStorage.setItem('theme', 'dark');
      setBtnText('Dark Mode');
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
    <div className={darkMode ? 'flex justify-between p-4 bg-black shadow-md items-center' : 'flex justify-between p-4 bg-white shadow-md items-center'}>
       <div className="flex items-center">
          <span onClick={()=>navigate('/')} className={darkMode ? "text-xl font-bold text-white cursor-pointer" : "text-xl font-bold text-grey-800 cursor-pointer"}>Collections</span>
          {isLogged && (<Button style="bg-grey" name="Profile" onClick={()=>navigate('/profile')} image={profile}/>)}
        </div>

        <div className="w-1/4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 bg-inherit border border-gray border-rounded"
            onChange={handleChange}
          />
          <div className={darkMode ? 'absolute bg-black w-1/4 text-white' :'absolute bg-white w-1/4'}>{searchResults.map((item)=>{
            return (
              <div onClick={()=>navigate(`item/${item._id}`)} className={ !darkMode ? 'px-3 py-2 cursor-pointer hover:bg-slate-100' :'px-3 py-2 cursor-pointer hover:bg-slate-600'}>
                {item.topic}
              </div>
            )
          })}
          </div>
        </div>

      <div className='flex'>

      <Button style={darkMode ? 'bg-black' : 'bg-white'} name={btnText} image={darkMode ? moon : sun} onClick={toggleMode}/>

        {
          isLogged && isAdmin && (<Button name="Admin Panel" image={userGear} onClick={()=>navigate('/admin')}/>)
        }
        {
          !isLogged ? (
            <div>
              <Button name="Sign In" style="bg-lime-600" onClick={()=>navigate('/login')}/>
            </div>
          ) : (
            <Button name="Logout" image={logout} style="bg-red-600" onClick={handleLogout}/>
          )
        }
      </div>
    </div>
  )
}

export default Navbar