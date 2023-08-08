import React,{useState} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import './Collection.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';


const Collection = () => {
  return (
    <>
    <Navbar/>
    <div>
        <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "12vw",fontFamily:"League Spartan",}}
        >
          Browse <span style={{ color: "#37BEC1" }}>Collections</span>
      </Typography>
      <Grid container className="grid-collection">
      <Grid item xs={6} lg={9} md={9}>
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
        <Grid item xs={3} lg={1} md={1} className="count-collection">
             2 <br/>
            <span style={{fontSize:"13px"}}>DOCUMENTS</span>
        </Grid>
        <Grid item xs={3} lg={1} md={1} className="count-collection">
             2 <br/>
            <span style={{fontSize:"13px"}}>INDEXES</span>
        </Grid>
        <Grid item xs={11} md={8} lg={8} className="collection-box" sx={{marginBottom:"3vh !important",  marginTop:"3vh"}}>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    _id: <span style={{color:"#438C8E"}}> 64b500ffb3519eb573027f26</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    name: <span style={{color:"#438C8E"}}> "mahek upadhye"</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    email: <span style={{color:"#438C8E"}}> "rishab@gmail.com"</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    phone: <span style={{color:"#438C8E"}}>8291002606</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    __v: <span style={{color:"#438C8E"}}>0</span>
                  </Typography>
                  
        </Grid>


        <Grid item xs={11} md={8} lg={8} className="collection-box" sx={{marginBottom:"3vh !important",  marginTop:"3vh"}}>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    _id: <span style={{color:"#438C8E"}}> 64b500ffb3519eb573027f26</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    name: <span style={{color:"#438C8E"}}> "rishab pendam"</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    email: <span style={{color:"#438C8E"}}> "mahek@gmail.com"</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    phone: <span style={{color:"#438C8E"}}>829107890</span>
                  </Typography>
                  <Typography variant="body1" align="left" color="initial" sx={{marginLeft:"4vw",color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan"}}>
                    __v: <span style={{color:"#438C8E"}}>0</span>
                  </Typography>
                  
        </Grid>

       
        </Grid>  
    </div>
    </>
  )
}

export default Collection