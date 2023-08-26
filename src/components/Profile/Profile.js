import React from 'react'
import Navbar from '../Navbar/Navbar'
import Grid from '@mui/material/Grid'
import './Profile.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', "Mahek", 6.0, 24, 4.0),
  createData('2', "Rishab", 9.0, 37, 4.3),
  createData('3', "Zoya", 16.0, 24, 6.0),
];






const Profile = () => {
  return (
    <div>
        <Navbar/>
        <Grid container className="grid-profile">
        <Grid item xs={12} md={6} lg={6}>
          <Box className="firstgrid">
          <Typography className="circlee-badge">
          <i className="fa-solid fa-trophy" style={{fontSize:"25px"}}></i>  
          </Typography>
          <Typography className="badge-typo" sx={{fontSize:"1.3rem",fontWeight:"bold"}}>
           Congratulations Rishab!
          </Typography>
          <Typography className="badge-desc" sx={{fontSize:"1rem"}}>
           You have successfully made more than 20 APIs. Check out your new badge!!
          </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} >
          <Box className="quickdb-grid">
          <Typography className="db-dash" align="left" sx={{backgroundColor:"#ADD8E6"}}>
          <i className="fa-solid fa-database" style={{fontSize:"20px"}}></i>
          <Typography sx={{marginTop:"3vh",fontSize:"1.7rem",fontWeight:"bold",color:"gray"}}>11</Typography> 
          <Typography sx={{marginTop:"1vh",fontSize:"1rem",width:"20vw",fontFamily:"League Spartan"}}>Databases created.
          </Typography>  
          </Typography><br/>
          </Box>
         
        </Grid>
        <Grid item xs={6} md={3} lg={3} >
        <Box className="quickdb-grid-2">
          <Typography className="api-dash" align="left" sx={{backgroundColor:"#DCC5F0"}}>
          <i className="fa-solid fa-globe" style={{fontSize:"20px"}}></i>
          <Typography sx={{marginTop:"3vh",fontSize:"1.7rem",fontWeight:"bold",color:"gray"}}>23</Typography> 
          <Typography sx={{marginTop:"1vh",fontSize:"1rem",width:"20vw",fontFamily:"League Spartan"}}>APIs generated.
          </Typography>  
          </Typography><br/>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile