import React,{useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Typography from "@mui/material/Typography";
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';



function Login() {

  const [email, setEmail] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [password, setPassword] = useState('')
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
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

  const [open, setOpen] = React.useState(false);
  const [validate,setValidate]=useState('')
  const handleOpen = (e) => {
    if(!emailRegex.test(email)){
      console.log("correct email")
      setValidate('email')
    }
    else if(password.length==0){
      setValidate('password')
    }
    else{
      setValidate('correct')
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const showToastMessage = () => {
    toast.success("Success! Databse created", {
      position: toast.POSITION.TOP_RIGHT,
     
    });
  };
  const [show, setShow] = useState(false)
  const [styles, setStyles] = useState("data_signup")
  const [otp, setOtp] = useState('');
  const [succ,setSucc]=useState(true)
  const handleShow=(e)=>{
        setShow(!show)
  }
  const handleSubmit=(e)=>{
    setSucc(false)
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        backgroundColor: "#e8e8e8",
      }}
    >
       <Typography className="logo_register" variant="body1" color="initial" align="left" sx={{paddingTop:"1vh",fontSize:"2.0rem",paddingLeft:"1vw",fontWeight:"bold"}}>
      <i className="fas fa-paper-plane" style={{color:"#E9CA16",fontSize:"1.5rem",marginRight:"0.5vw"}}></i>
        quik<span style={{color:"#37BEC1"}}>APIs</span>
      </Typography>
      <Box
        className="outer_box"
        sx={{
          width: "80vw",
          height: "80vh",
          marginLeft: "10vw",
          marginTop: "4vh",
        }}
      >
        <Grid container>
          <Grid
            item
            className="image_signup"
            sx={{ height: "80vh",backgroundImage:" linear-gradient(144deg,#b478de, #4cb5b5 50%,#dde4e5)" }}
            md={5}
            lg={5}
          >
           
          </Grid>
          <Grid
            item
            sx={{ backgroundColor: "#e0e0e0", height: "80vh"}}
            xs={12}
            md={7}
            lg={7}
          >
            <Grid
              className={styles}
              sx={{ height: "60vh",margin: "10vh" }}
            >
   
              <>
              <Typography
                variant="body1"
                align="left"
                className="heading_signup"
                variant="h4"
                sx={{ fontWeight: "bold", fontFamily: "sans-serif",color:"black" }}
              >
                Login<span style={{ color: "#37BEC1" }}></span>{" "}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                className="heading_signup"
                sx={{ fontFamily: "sans-serif", marginTop: "1vh"}}
                sx={{ color: "gray" }}
              >
                Don't have an account?{" "}
                <span style={{ color: "#37BEC1" }}><Link to='/register' style={{textDecoration:"none",color:"#37BEC1"}}>Signup</Link></span>{" "}
              </Typography>
              
             
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name="text" className="input_signup_1" placeholder="Email" />

              <input type={show?"text":"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" className="input_signup_2" placeholder="Password">
              </input>
              
              <Grid>
              <Grid item className="checkbox-wrapper">
              <label >   
                <input type="checkbox" onClick={handleShow} />
                <span class="checkbox"></span>
              </label>
              </Grid>
              <Grid item xs={9} md={9}>
               <Typography  sx={{paddingLeft:"0.7vw !important",marginTop:"1vh",color:"gray",fontSize:"13px"}} align="left" color="initial">Show Password</Typography>
              </Grid>
              </Grid> 
              <Grid sx={{marginTop:"3vh"}}>
              <button className="btn" onClick={handleOpen} style={{marginRight:"5vw"}} >   Submit
              </button>
            {validate=='email'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Enter correct email <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate=='correct'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i class="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                Successful Login! <span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
            {validate=='password'&&<Modal
                open={open}
                sx={{border:"none !important"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
                <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
                 Enter password<span style={{marginRight:"1vw !important"}}></span>
                </Typography>
              </Box>
            </Modal>
            }
              </Grid> 
              </>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
