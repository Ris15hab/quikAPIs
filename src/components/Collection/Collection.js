import React,{useState,useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import './Collection.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import nodata from '../../nodata.png'
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "20vw",
  bgcolor: 'background.paper',
  borderRadius:"25px",
  boxShadow: 24,
  p: 4,
};

const style_modal_popup = {
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


const Collection = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [validate,setValidate]=useState('');
  const [open, setOpen] = React.useState(false);
  const [open_modal_popup, setOpen_modal_popup] = React.useState(false);
  const [datadb,setDatadb] = useState([]);
  const [datadbcount,setDatadbcount] = useState([]);
  const [datadbname,setDatadbName] = useState('');
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const token = localStorage.getItem('token')
          const result = await axios.get("http://localhost:8000/userDB/getUserDBCollection?_id="+id,{
              headers: {
                'authentication':token,
              }
          });
          // console.log(result)
          setDatadb(result.data.response.data)
          setDatadbName(result.data.name)
          setDatadbcount(result.data.response.count)
      }catch(err){
        setValidate('unknown')
        setOpen_modal_popup(true)
        setTimeout(() => {
          setOpen_modal_popup(false);
        }, 2000);
      }
    }

    fetchData();
  },[])

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
          Browse <span style={{ color: "#37BEC1" }}>Documents</span>
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
                {datadbname}
              </Typography>
        </Grid>
        <Grid item xs={3} lg={1} md={1} className="count-collection">
             {datadbcount} <br/>
            <span style={{fontSize:"13px"}}>DOCUMENTS</span>
        </Grid>
        <Grid item xs={3} lg={1} md={1} className="count-collection">
             2 <br/>
            <span style={{fontSize:"13px"}}>INDEXES</span>
          </Grid>
          {(datadbcount===0)?(
            <>
            <img src={nodata} className="nodata1" alt="no data"></img>
            <Typography className='note-head1' variant="body1" color="initial" align='left' >
              No Documents to display!
            </Typography>
            </>
          ):(
          datadb.map((obj, index) => (
        <Grid item xs={11} md={8} lg={8} className="collection-box" sx={{marginBottom:"3vh !important",  marginTop:"3vh"}} key={datadb[index]._id}>
                  <Typography variant="body1" align="right" color="initial" sx={{color:"#5A5A5A",fontWeight:"bold",fontFamily:"League Spartan",marginRight:"1vw"}}>
                              <Button variant="text" color="primary">
                              <i className="fa-regular fa-pen-to-square" style={{fontSize:"1.1rem",color:"green"}}></i>
                              </Button>
                               <Button variant="text" color="primary" onClick={handleOpen}>
                               <i class="fa-regular fa-trash-can" style={{fontSize:"1.1rem",color:"red"}}></i>
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style} className="modal-box-delete">
                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Are you sure you want to delete this document?
                                  </Typography>
                                  <Typography id="modal-modal-description" align="right" sx={{ mt: 2 }}>
                                  <Button sx={{color:"red"}} onClick={handleClose}>YES</Button> <Button onClick={handleClose} sx={{color:"gray"}}>Cancel</Button>
                                  </Typography>
                                </Box>
                              </Modal>
                  </Typography>
                  

                      {Object.entries(obj).map(([key, value]) => (
                        <Typography
                          key={key}
                          variant="body1"
                          align="left"
                          color="initial"
                          sx={{ marginLeft: "4vw", color: "#5A5A5A", fontWeight: "bold", fontFamily: "League Spartan" }}
                        >
                          {key}: <span style={{color:"#438C8E"}}> {value}</span>
                        </Typography>
                      ))}
                  
        </Grid>))
            
          )}
        </Grid> 
        {validate=='unknown'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
    </div>
    </>
  )
}

export default Collection