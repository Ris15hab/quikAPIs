import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from '@mui/material/Typography'
import './Contact.css'
import Grid from '@mui/material/Grid'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




const Contact = () => {
  const [message, setMessage] = useState('Send')
  const [text, setText] = useState('')
  const [subject, setSubject] = useState('  ')
  const [email, setEmail] = useState('')
  const handleSubmit=(e)=>{
    setEmail('');
    setText('');
    setSubject(' ');
    setMessage("Message Sent!")

  }
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

      <Grid className="grid-contact" sx={{marginLeft:"40vw",width:"30vw",marginTop:"3vh"}}>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
          Email
        </Typography>
        <input  type="text" name="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="contact-name" style={{fontFamily:"League Spartan",color:"gray"}} /><br/>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",fontFamily:"League Spartan",fontWeight:"bold",color:"gray"}}>
        <input type="checkbox" id="vehicle1" name="vehicle1"/>
        <label for="vehicle1" className="label-input" style={{marginLeft:"0.5vw"}}>Use my account email</label><br/>
        </Typography>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
        Subject
        </Typography>
        <FormControl
              variant="standard"
              fullWidth
              className="contact-select"
              sx={{ marginTop: "1vh", padding: "8px",marginBottom:"3vh" }}
            >
              <Select
                 value={subject} 
                onChange={(e)=>setSubject(e.target.value)}
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw",fontFamily:"League Spartan" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
                name="type"
              >
                <MenuItem value="" name="type">
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                      fontFamily:"League Spartan"
                    }}
                  >
                    What's your issue?
                  </Typography>
                </MenuItem >
                <MenuItem name="type" value={"Integer"}>
                  Issue with quikAPI
                </MenuItem>
                <MenuItem name="type" value={"Float"}>
                Issue with quikDB
                </MenuItem>
                <MenuItem name="type" value={"String"}>
                Unable to generate quikAPI
                </MenuItem>
                <MenuItem name="type" value={"Boolean"}>
                  Issue with crud operations
                </MenuItem>
                <MenuItem name="type" value={"Double"}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
        </div>
        <div>
        <Typography className="typo-contact" align="left" sx={{fontSize:"1.1rem",marginTop:"3vh",color:"#3fabbf",fontFamily:"League Spartan",fontWeight:"bold"}}>
        Message
        </Typography>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} type="text" name="text" className="contact-name" style={{height:"15vh",color:"gray" , fontFamily:"League Spartan"}} />
        </div>
        <Typography  align="center" sx={{color:"white"}}>
          <button className="contact-submit" style={{marginTop:"3vh",width:"13vw",marginBottom:"10vh"}} onClick={handleSubmit}>
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