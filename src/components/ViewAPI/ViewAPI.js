import React ,{ useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./ViewAPI.css";
import {Link,useFetcher,useNavigate} from 'react-router-dom'
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};

const ViewAPI = () => {
  const navigate=useNavigate()
  const [validate,setValidate]=useState('');
  const [open, setOpen] = React.useState(false);
  const [datadb,setDatadb] = useState([])


  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const token = localStorage.getItem('token')
          const response = await axios.get("http://localhost:8000/userDB/getUserDB",{
              headers: {
                'authentication':token,
              }
          });
          setDatadb(response.data.response)
          console.log(datadb)
      }catch(err){
        setValidate('unknown')
        setOpen(true)
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    }

    fetchData();
  },[])

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

        {
        datadb.map((data)=>{ 
          return(
        <Grid className="api-box" key={data._id} >
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
                {data.modelName}
              </Typography>
            </Grid>
            <Grid item xs={5} lg={5} md={5}>

              <button class="btn-api" onClick={()=>{navigate(`/collection/${data._id}`)}}>
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
                  marginTop: "-3vh",
                  color:"gray",
                  fontSize: "1rem",
                }}
              >
                {data.modelDescription}
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
                No of Entries : {data.count}
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
                Created At: {data.dateTime}
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
        </Grid> )})}

        {validate=='unknown'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>}
      </div>
    </>
  );
};

export default ViewAPI;
