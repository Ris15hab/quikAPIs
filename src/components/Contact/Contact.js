import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from '@mui/material/Typography'
import './Contact.css'
import Grid from '@mui/material/Grid'



const Contact = () => {
  const [message, setMessage] = useState('Send')
  return (
    <>
    <div className="css-gradient">
     <Navbar/>
    <div >
      <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "12vw",fontFamily:"League Spartan",}}
        >
          Get in <span style={{ color: "#37BEC1" }}>Touch!</span>
      </Typography>

      <Grid className="grid-contact" sx={{marginLeft:"40vw",width:"30vw",marginTop:"6vh"}}>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
           Enter Email
        </Typography>
        <input  type="text" name="text" className="contact-name"  />
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
           Enter Email
        </Typography>
        <input  type="text" name="text" className="contact-name"  />
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
           Enter Message
        </Typography>
        <textarea  type="text" name="text" className="contact-name" style={{height:"15vh"}} />
        </div>
        <Typography  align="center" sx={{color:"white"}}>
          <button className="contact-btn" style={{marginTop:"5vh"}} onClick={(e)=>setMessage('Sent!')}>
            {message}
          </button>
        </Typography>
      </Grid>
      

    </div>
    </div>
    </>
  )
}

export default Contact