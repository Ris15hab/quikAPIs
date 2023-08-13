import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import './API.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';





const API = () => {
  const [api, setApi] = useState('localhost:8000/testing1_205434_64c372e1ed9a2a7153c5010d/updateDataById');
  // const [copy,setCopy]=useState(false)
  const copyToClipboard = () => {
    copy(api);
    setOpen(true);
    setTimeout(() => {
      setOpen(false)
    }, 1000);
    // setCopy(true)
}
const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };
  return (
    <>
    <Navbar/>
    <div>
    <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw",fontFamily:"League Spartan" }}
        >
          Use <span style={{ color: "#37BEC1" }}>quikAPI</span>
      </Typography>
      <Typography className='note-head' variant="body1" color="initial" align='left' sx={{marginLeft:"46vw",fontFamily:"League Spartan"}}>
        NOTE: only use the mentioned crud methods.
      </Typography>
      <Grid container className='firstt'>
        <Grid item xs={10} lg={10} md={10}>
              <Typography align="left" className="secondd" sx={{fontFamily: "League Spartan",
                  color:"	#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.5rem",}} >
                <i
                  className="fas fa-paper-plane"
                  style={{
                    color: "#E9CA16",
                    fontSize: "0.9rem",
                    marginRight: "1vw",
                  }}
                ></i>    
                Database Name
              </Typography>
        </Grid>
        
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3"}}>
                  <Typography className="operation" align="left" sx={{color:'blue',fontSize:"17px"}}>
                    PUT
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'>
                    {api}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid onClick={copyToClipboard} item className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"2.3vw",backgroundColor:"#c8e7ee",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fa-regular fa-copy"  id="clipboard-icon"></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        
        {/* <Chip label="success" color="success" variant="outlined" sx={{backgroundColor:"red"}}/> */}
        
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3"}}>
                  <Typography className="operation" align="left" sx={{color:'green',fontSize:"17px"}}>
                    GET
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'>
                  {api}
                  </Typography>
                 </Grid> 
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"2.3vw",backgroundColor:"#c8e7ee",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fa-regular fa-copy"  id="clipboard-icon"></i>
                 </Grid>
        </Grid>
        
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"3.5vw",borderRight: "2px solid #D3D3D3"}}>
                  <Typography className="operation" align="left" sx={{color:'red',fontSize:"17px"}}>
                    DELETE
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'>
                  {api}
                  </Typography>
                 </Grid> 
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"2.3vw",backgroundColor:"#c8e7ee",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fa-regular fa-copy"  id="clipboard-icon"></i>
                 </Grid>
                 
        </Grid>
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3"}}>
                  <Typography className="operation" align="left" sx={{color:'orange',fontSize:"17px"}}>
                    POST
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'>
                  {api}
                  </Typography>
                 </Grid> 
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"2.3vw",backgroundColor:"#c8e7ee",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fa-regular fa-copy"  id="clipboard-icon"></i>
                 </Grid>
        </Grid>
      </Grid>
    </div>
    </>
  )
}

export default API