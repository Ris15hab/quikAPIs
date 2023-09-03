import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Grid from "@mui/material/Grid";
import "./Profile.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import axios from "axios";
import Chart from "react-apexcharts";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "15px",
  border: "none !important",
  transition: " all .4s",
};

const Profile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [validate, setValidate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = useState({})
  const [topDB, setTopDB] = useState([])
  const [loading, setLoading] = React.useState(false);
  const [donut,setDonut]=useState({series: [1, 1, 1, 1],
    options: {
      colors:["#58ac7b", "#FFB52E","#37BEC1","#c07b71"],
      chart: {
        type: 'pie',
        
      },
      labels:["get","post","put","delete"],
    },
  })
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      colors: ["#FFFF00", "#37BEC1"],
      style: {
        fontSize: "14px",
        fontFamily: "League Spartan",
        fontWeight: "bold",
        colors: undefined,
      },
      dataLabels: {
        enabled: 0,
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
    series: [
      {
        name: "Databases created",
        data: [0, 1, 1, 0, 0, 0, 0, 0],
      },
      {
        name: "APIs hit",
        data: [10, 23, 33, 12, 10, 50, 70, 91],
      },
    ],
  });

  // const handleName = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:8000/user/getUserById",
  //       {
  //         headers: {
  //           authentication: token,
  //         },
  //       }
  //     );
  //     setName(response.data.userData.name);
  //     //setEmail(response.data.userData.email)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    try{
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:8000/profilePage/getInfo",
            {
              headers: {
                authentication: token,
              },
            }
          );
          setProfileData(response.data)
          setName(response.data.userData.username)
          setTopDB(response.data.top2QuikDbs)
          setLoading(false);
        } catch (err) {
          setValidate("unknown");
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 1500);
        }
      };
  
      fetchData();
    }catch(err){

    }
  }, []);

  // console.log(profileData.userData.username)

  return (
    <>
    <div>
      <Navbar />
      {loading ? (
          <>
         <div className="loading" style={{marginTop:"30vh",marginLeft:"10vw"}}>
         <svg width="64px" height="48px">
             <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
           <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
         </svg>
        </div>
        <p style={{marginLeft:"10vw"}}>loading...</p>
        </>
        ) : (
          <>
      <Typography
        variant="body1"
        color="initial"
        align="left"
        className="profile_head"
        sx={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          paddingLeft: "20vw",
          paddingBottom: "2vh",
          marginTop: "-4vh",
        }}
      >
        {name}'s <span style={{ color: "#37BEC1" }}> Profile</span>
      </Typography>
      <Grid container className="grid-profile">
        <Grid item xs={6} md={3} lg={3}>
          <Box className="quickdb-grid">
            <Typography
              className="db-dash"
              align="left"
              sx={{ backgroundColor: "#ADD8E6" }}
            >
              <i
                className="fa-solid fa-database"
                style={{ fontSize: "20px" }}
              ></i>
              <Typography
                sx={{
                  marginTop: "3vh",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                {profileData.quikDbCount}
              </Typography>
              <Typography
                sx={{
                  marginTop: "1vh",
                  fontSize: "1rem",
                  width: "20vw",
                  fontFamily: "League Spartan",
                }}
              >
                Databases created.
              </Typography>
            </Typography>
            <br />
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box className="quickdb-grid-2">
            <Typography
              className="api-dash"
              align="left"
              sx={{ backgroundColor: "#DCC5F0" }}
            >
              <i className="fa-solid fa-globe" style={{ fontSize: "20px" }}></i>
              <Typography
                sx={{
                  marginTop: "3vh",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                {profileData.quikApiCount}
              </Typography>
              <Typography
                sx={{
                  marginTop: "1vh",
                  fontSize: "1rem",
                  width: "20vw",
                  fontFamily: "League Spartan",
                }}
              >
                APIs generated.
              </Typography>
            </Typography>
            <br />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box className="firstgrid">
            <Typography className="circlee-badge">
              <i
                className="fa-solid fa-trophy"
                style={{ fontSize: "25px" }}
              ></i>
            </Typography>
            <Typography
              className="badge-typo"
              sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
            >
              Congratulations Mahek!
            </Typography>
            <Typography className="badge-desc" sx={{ fontSize: "1rem" }}>
              You have successfully made more than 20 APIs. Check out your new
              badge!!
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="body1"
        color="initial"
        align="left"
        className="profile_head"
        sx={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          paddingLeft: "20vw",
          paddingTop: "3vh",
        }}
      >
        {" "}
        Top<span style={{ color: "#37BEC1" }}> quikDBs</span>
      </Typography>
      <Grid container sx={{ marginTop: "1vh" }}>
        {(profileData.quikDbCount===0)?(
          <Typography
          className="note-head1"
          variant="body1"
          color="initial"
          align="left"
          sx = {{marginTop:"3vh",marginBottom:"4vh",marginLeft:"50vw !important"}}
        >
          {"No Collections to display :( "}
        </Typography>
        ):(
          topDB.map((data)=>{

          return(
        <Grid item xs={12} lg={4.4} md={4.3} className="top-db">
          <Typography
            variant="body1"
            color="initial"
            align="left"
            sx={{
              paddingLeft: "1vw",
              fontWeight: "bold",
              fontFamily: "League Spartan",
            }}
          >
            <i
              className="fas fa-paper-plane"
              style={{
                color: "orange",
                fontSize: "0.9rem",
                marginRight: "1vw",
              }}
            ></i>
            {data.modelName}
            <i
              className="fa-solid fa-trophy"
              style={{
                fontSize: "12px",
                color: "#E9CA16",
                marginLeft: "0.4vw",
              }}
            ></i>
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            align="left"
            sx={{
              paddingLeft: "2.8vw",
              color: "gray",
              fontFamily: "League Spartan",
            }}
          >
            {data.modelDescription}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            align="left"
            sx={{
              paddingLeft: "2.8vw",
              color: "#088F8F",
              fontSize: "0.9rem",
              paddingTop: "1vh",
              fontFamily: "League Spartan",
            }}
          >
            No of Entries: {data.count}
          </Typography>
        </Grid>
        )})    
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={4.4} md={4.4} sx={{ marginTop: "5vh" }}>
          <Chart
            className="chart-profile"
            options={state.options}
            series={state.series}
            type="area"
            height="250"
          />
        </Grid>
        <Grid item xs={12} md={4.4} lg={4.4}>
        <Chart
            className="chart-profile-1"
            options={donut.options}
            series={donut.series}
            type="pie"
            height="200"
          />

        </Grid>
      </Grid>
      </>
        )}
      {validate=='unknown'&&<Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
          <i className="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
          Oops! An Error Occurred<span style={{marginRight:"1vw !important"}}></span>
          </Typography>
        </Box>
      </Modal>
      }
    </div>
    </>
  );
};

export default Profile;
