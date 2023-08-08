import React from "react";
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./ViewAPI.css";
import {Link,useNavigate} from 'react-router-dom'

const ViewAPI = () => {
  const navigate=useNavigate()
  return (
    <>
      <Navbar />
      <div className="home-api">
        <Typography
          variant="body1"
          color="initial"
          className="create_head"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw" }}
        >
          My <span style={{ color: "#37BEC1" }}>quikDB</span>
        </Typography>

        <Grid className="api-box">
          <Grid container>
            <Grid item xs={12} lg={7} md={7}>
              <Typography
                align="left"
                className="typo-api"
                sx={{
                  marginLeft: "3vw",
                  fontFamily: "League Spartan",
                  marginTop: "5vh",
                 
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                <i
                  className="fas fa-paper-plane"
                  style={{
                    color: "#E9CA16",
                    fontSize: "0.9rem",
                    marginRight: "1vw",
                  }}
                ></i>
                Database 2
              </Typography>
            </Grid>
            <Grid item xs={5} lg={5} md={5}>

              <button class="btn-api" onClick={()=>{navigate('/collection')}}>
                <i
                  class="fa-solid fa-database"
                  style={{ color: "#ffffff", marginRight: "2vw" }}
                ></i>
                Collections
              </button>

            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={7} md={7}>
              <Typography
                align="left"
                className="typo-api"
                sx={{
                  marginLeft: "5vw",
                  fontFamily: "League Spartan",
                  marginTop: "-2vh",
                  color:"gray",
                  fontSize: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                doloremque nemo vero laudantium vel quidem? Accusamus enim
                minima at
              </Typography>
              <Typography
                align="left"
                className="typo-api"
                sx={{
                  marginLeft: "5vw",
                  fontFamily: "League Spartan",
                  marginTop: "1vh",
                  paddingBottom: "1vh",
                  fontSize: "1rem",
                }}
              >
                No of Entries : 3
              </Typography>
              <Typography
                align="left"
                className="typo-api"
                sx={{
                  marginLeft: "5vw",
                  fontFamily: "League Spartan",
                  paddingBottom: "3vh",
                  fontSize: "1rem",
                }}
              >
                Created At: -
              </Typography>
            </Grid>
            <Grid item xs={5} lg={5} md={5}>
             
              <button class="btn-api-1" onClick={()=>{navigate('/api')}}>
                <i
                  class="fa-solid fa-magnifying-glass"
                  style={{ color: "#ffffff", marginRight: "1vw" }}
                ></i>
                APIs
              </button>
            </Grid>
            <Grid container className="btn-gayab">
              <Grid item xs={6}>
                <button class="btn-api-mobile" onClick={()=>{navigate('/collection')}}>
                  <i
                    class="fa-solid fa-database"
                    style={{ color: "#ffffff", marginRight: "2vw" }}
                  ></i>
                  Collections
                </button>
              </Grid>
              <Grid item xs={6}>

                <button class="btn-api-1-mobile" onClick={()=>{navigate('/api')}}>
                
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style={{ color: "#ffffff", marginRight: "1vw" ,textDecoration:"none !important"}}
                  ></i>
                  APIs
                  
                </button>

               
              </Grid>
            </Grid>
          </Grid>
        </Grid>



        

       

        
      </div>
    </>
  );
};

export default ViewAPI;
