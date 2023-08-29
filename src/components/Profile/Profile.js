import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Grid from "@mui/material/Grid";
import "./Profile.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Chart from "react-apexcharts";


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", "Mahek", 6.0, 24, 4.0),
  createData("2", "Rishab", 9.0, 37, 4.3),
  createData("3", "Zoya", 16.0, 24, 6.0),
];

const Profile = () => {
  const [name, setName] = useState("");
  const [donut,setDonut]=useState({series: [44, 55, 41, 17],
    options: {
      colors:["#58ac7b", "#FFB52E","#37BEC1","#c07b71"],
      chart: {
        type: 'donut',
        
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
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "APIs hit",
        data: [96, 30, 45, 50, 10, 50, 70, 91],
      },
    ],
  });

  const handleName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/user/getUserById",
        {
          headers: {
            authentication: token,
          },
        }
      );
      setName(response.data.userData.name);
      //setEmail(response.data.userData.email)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleName();
  }, []);

  return (
    <div>
      <Navbar />
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
          marginTop: "-1vh",
        }}
      >
        {" "}
        Mahek's <span style={{ color: "#37BEC1" }}> Profile</span>
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
                11
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
                23
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
            Users{" "}
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
            Lorem ipsum dolor sit amet consectetur, adipisici....
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
            No of Entries: 32
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4.4} md={4.3} className="top-db-1">
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
            Testing{" "}
            <i
              className="fa-solid fa-trophy"
              style={{ fontSize: "12px", color: "silver", marginLeft: "0.4vw" }}
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
            Lorem ipsum dolor sit amet consectetur, adipisici....
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
            No of Entries: 25
          </Typography>
        </Grid>
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
            type="donut"
            height="200"
          />

        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
