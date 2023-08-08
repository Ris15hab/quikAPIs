import React,{useState} from 'react'
import './Navbar.css'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import {useNavigate,Link} from 'react-router-dom'


const Navbar = () => {
  const [nav,setNav]=useState(false)
  const handleNav=()=>{
    setNav(!nav);
    console.log(nav)
  }
  const navigate=useNavigate()
  return (
    <div>
      <div className="sidebar1">
          <Typography className="logo_register" variant="body1" color="initial" align="left" sx={{paddingTop:"1.5vh",fontSize:"2.0rem",paddingLeft:"2vw",fontWeight:"bold"}}>
          <i className="fas fa-paper-plane" style={{color:"#E9CA16",fontSize:"1.5rem",marginRight:"0.5vw"}}></i>
          quik<span style={{color:"#37BEC1"}}>APIs</span>
         </Typography>
         <Divider sx={{marginTop:"1vh"}}/>
         <Link to='/profile' id="first_nav" >
          <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-regular fa-user" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My Profile</Typography>
        </Link>
        <Link to='/createdb'>
          <Typography variant="body1" color="initial" className="nav_item">
          
          <i class="fa-solid fa-plus" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Create DB
          </Typography>
        </Link>

        
        <Link to='/viewapi'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-solid fa-magnifying-glass" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My quikDB </Typography>
        </Link>
        <a>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-solid fa-link" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             How To Use</Typography>
        </a>
        <Link to='/contact'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-regular fa-comment" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Contact Us</Typography>
        </Link>

        <Divider sx={{marginTop:"29vh"}}/>
       
        <Typography variant="body1" color="initial" onClick={()=>navigate('/')}  sx={{marginTop:"2vh",cursor:"pointer"}}>
       
          <i class="fa-solid fa-arrow-right" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Logout
        
        </Typography>
 
        </div>
      {nav&&
        <div className="sidebar">
          <Typography className="logo_register" variant="body1" color="initial" align="left" sx={{paddingTop:"1.5vh",fontSize:"2.0rem",paddingLeft:"2vw",fontWeight:"bold"}}>
          <i className="fas fa-paper-plane" style={{color:"#E9CA16",fontSize:"1.5rem",marginRight:"0.5vw"}}></i>
          quik<span style={{color:"#37BEC1"}}>APIs</span>
         </Typography>
         <Divider sx={{marginTop:"1vh"}}/>
         <Link to='/profile' id="first_nav" >
          <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-regular fa-user" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My Profile</Typography>
        </Link>

        <Link to='/createdb'>
          <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-solid fa-plus" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Create DB</Typography>
        </Link>
         
        
        <Link to='/viewapi'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-solid fa-magnifying-glass" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My quikDB</Typography>
        </Link>
        <a>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-solid fa-link" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             How To Use</Typography>
        </a>
        <Link to='/contact'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i class="fa-regular fa-comment" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Contact Us</Typography>
        </Link>
        <Divider sx={{marginTop:"27vh"}}/>
        
        <Typography variant="body1" color="initial" onClick={()=>navigate('/')} sx={{marginTop:"2vh",cursor:"pointer"}}>
          
          
          <i class="fa-solid fa-arrow-right" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Logout
          
        </Typography>
       
        </div>
      }
        <MenuIcon sx={{marginLeft:"80vw",marginTop:"4vh",color:"#005c99"}} className="menu_icon" onClick={handleNav}/> 
    </div>
  )
}

export default Navbar