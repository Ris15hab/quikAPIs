import React,{useState} from 'react'
import './Navbar.css'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import {useNavigate,Link} from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
  position: "absolute",
  top: "50%",
  height:"20vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  border: '2px solid #e0e0e0',
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};
const style2 = {
  position: "absolute",
  top: "50%",
  height:"20vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  border: '2px solid #e0e0e0',
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};


const Navbar = () => {
  const [nav,setNav]=useState(false)
  const [logout,setLogout]=useState(false)
  const [logout2,setLogout2]=useState(false)
  const handleNav=()=>{
    setNav(!nav);
    console.log(nav)
  }

  const navigate=useNavigate()
  const handleLogout=(e)=>{
    setLogout(true)
    setTimeout(() => {
      setLogout(false)
      navigate('/')
    }, 2000);
    
  }
  const handleLogout2=(e)=>{
    setLogout2(true)
    setTimeout(() => {
      setLogout2(false)
      navigate('/')
    }, 2000);
    
  }
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
          <i className="fa-regular fa-user" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My Profile</Typography>
        </Link>
        <Link to='/createdb'>
          <Typography variant="body1" color="initial" className="nav_item">
          
          <i className="fa-solid fa-plus" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Create DB
          </Typography>
        </Link>

        
        <Link to='/viewapi'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-solid fa-magnifying-glass" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My quikDB </Typography>
        </Link>
        <a>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-solid fa-link" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             How To Use</Typography>
        </a>
        <Link to='/contact'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-regular fa-comment" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Contact Us</Typography>
        </Link>

        <Divider sx={{marginTop:"29vh"}}/>
       
        <Typography variant="body1" color="initial" onClick={handleLogout}  sx={{marginTop:"2vh",cursor:"pointer"}}>
       
          <i className="fa-solid fa-arrow-right" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Logout
        </Typography>
        <Modal
          open={logout}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div id="wifi-loader" style={{marginLeft:"8vw",marginTop:"5vh",marginBottom:"5vh"}}>
              <svg className="circle-outer" viewBox="0 0 86 86">
                  <circle className="back" cx="43" cy="43" r="40"></circle>
                  <circle className="front" cx="43" cy="43" r="40"></circle>
                  <circle className="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg className="circle-middle" viewBox="0 0 60 60">
                  <circle className="back" cx="30" cy="30" r="27"></circle>
                  <circle className="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg className="circle-inner" viewBox="0 0 34 34">
                  <circle className="back" cx="17" cy="17" r="14"></circle>
                  <circle className="front" cx="17" cy="17" r="14"></circle>
              </svg>
          </div>
          </Box>
        </Modal>
 
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
          <i className="fa-regular fa-user" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My Profile</Typography>
        </Link>

        <Link to='/createdb'>
          <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-solid fa-plus" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Create DB</Typography>
        </Link>
         
        
        <Link to='/viewapi'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-solid fa-magnifying-glass" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             My quikDB</Typography>
        </Link>
        <a>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-solid fa-link" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             How To Use</Typography>
        </a>
        <Link to='/contact'>
        <Typography variant="body1" color="initial" className="nav_item">
          <i className="fa-regular fa-comment" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
             Contact Us</Typography>
        </Link>
        <Divider sx={{marginTop:"27vh"}}/>
        
        <Typography variant="body1" color="initial" onClick={handleLogout2}  sx={{marginTop:"2vh",cursor:"pointer"}}>
       
       <i className="fa-solid fa-arrow-right" style={{marginRight:"1.2rem",color:"#747e81"}}></i>
          Logout
     </Typography>
     <Modal
       open={logout2}
       sx={{border:"none !important"}}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style2}>
       <div id="wifi-loader" style={{marginLeft:"14vw",marginTop:"5vh",marginBottom:"5vh"}}>
           <svg className="circle-outer" viewBox="0 0 86 86">
               <circle className="back" cx="43" cy="43" r="40"></circle>
               <circle className="front" cx="43" cy="43" r="40"></circle>
               <circle className="new" cx="43" cy="43" r="40"></circle>
           </svg>
           <svg className="circle-middle" viewBox="0 0 60 60">
               <circle className="back" cx="30" cy="30" r="27"></circle>
               <circle className="front" cx="30" cy="30" r="27"></circle>
           </svg>
           <svg className="circle-inner" viewBox="0 0 34 34">
               <circle className="back" cx="17" cy="17" r="14"></circle>
               <circle className="front" cx="17" cy="17" r="14"></circle>
           </svg>
       </div>
       </Box>
     </Modal>
       
        </div>
      }
        <MenuIcon sx={{marginLeft:"80vw",marginTop:"4vh",color:"#005c99"}} className="menu_icon" onClick={handleNav}/> 
    </div>
  )
}

export default Navbar