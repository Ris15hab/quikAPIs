import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import "./CreateDB.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TableBody from "@mui/material/TableBody";
import { TableCell, Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";

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

const CreateDB = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
   
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  // const showToastMessage = () => {
  //   toast.success("Success! Databse created", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     className: "toast-message",
  //   });
  // };

  const [inpval, setInpval] = useState({
    name: "",
    type: "",
    unique: "",
    required: "",
  });

  const [final, setFinal] = useState([]);

  useEffect(() => {}, [inpval, final]);

  const getdata = (e) => {
    const { value, name } = e.target;

    setInpval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    const newRecords = { ...inpval, id: new Date().getTime().toString() };
    setFinal([...final, newRecords]);
  };
  const handleDelete = (index, e) => {
    setFinal(final.filter((v, i) => i !== index));
    console.log(final);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <Typography
          variant="body1"
          color="initial"
          className="create_head"
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          {" "}
          Create <span style={{ color: "#37BEC1" }}>quikDB</span>
        </Typography>
        <Grid container className="home">
          <Grid item xs={11} md={5} sx={{ margin: "2vh" }}>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="typo-input"
              sx={{ fontSize: "1.3rem" }}
            >
              {" "}
              Database Name
            </Typography>
            <input type="text" name="text" class="input_create" required  style={{color:"gray"}} />
          </Grid>
        </Grid>
        <Grid container className="home">
          <Grid item xs={11} md={5} sx={{ margin: "2vh" }}>
            <Typography
              variant="body1"
              color="initial"
              align="left"
              className="typo-input"
              sx={{ fontSize: "1.3rem" }}
            >
              {" "}
              Database Description
            </Typography>
            <textarea
              rows="4"
              cols="100"
              type="text"
              name="text"
              className="input_create"
              style={{color:"gray"}}
              required
            />
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          color="initial"
          className="field-create"
          align="left"
          sx={{ fontSize: "1.3rem", marginTop: "3vh" }}
        >
          Fields
        </Typography>
        <Grid container className="home">
          <Grid item xs={11} md={3} sx={{}}>
            <input
            style={{color:"gray"}}
              type="text"
              value={inpval.name}
              onChange={getdata}
              name="name"
              class="input_field"
              placeholder="Name"
              required
            />
          </Grid>
          <Grid item xs={11} md={2} sx={{}}>
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_1"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px" }}
            >
              <Select
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={inpval.type}
                onChange={getdata}
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
                    }}
                  >
                    Select Type
                  </Typography>
                </MenuItem>
                <MenuItem name="type" value={"Integer"}>
                  Integer
                </MenuItem>
                <MenuItem name="type" value={"Float"}>
                  Float
                </MenuItem>
                <MenuItem name="type" value={"String"}>
                  String
                </MenuItem>
                <MenuItem name="type" value={"Boolean"}>
                  Boolean
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={11} md={2}>
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_2"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px" }}
            >
              <Select
                name="required"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw" }}
                value={inpval.required}
                onChange={getdata}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
              >
                <MenuItem value="" name="required">
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                    }}
                  >
                    Required 
                  </Typography>
                </MenuItem>
                <MenuItem name="required" value={"false"}>
                  No
                </MenuItem>
                <MenuItem name="required" value={"true"}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={11} md={2} sx={{}}>
            <FormControl
              variant="standard"
              fullWidth
              className="input_field_3"
              sx={{ marginTop: "1vh", marginLeft: "1vw", padding: "8px" }}
            >
              <Select
                name="unique"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                sx={{ color: "gray", fontWeight: "bold", marginLeft: "1vw" }}
                value={inpval.unique}
                onChange={getdata}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
              >
                <MenuItem value="" name="unique">
                  <Typography
                    variant="body1"
                    align="left"
                    color="initial"
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: "1vw",
                    }}
                  >
                    Unique
                  </Typography>
                </MenuItem>
                <MenuItem name="unique" value={"false"}>
                  No
                </MenuItem>
                <MenuItem name="unique" value={"true"}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} md={1} sx={{}}>
            <button
              onClick={handleSubmit}
              className="input_field_4"
              style={{ cursor: "pointer" }}
            >
              <i class="fa-solid fa-plus" style={{ color: "#37BEC1" }}></i>
            </button>
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          color="initial"
          className="field-create"
          align="left"
          sx={{ fontSize: "1.3rem", marginTop: "5vh" }}
        >
          Preview
        </Typography>
        <TableContainer
          className="table-mobile"
          sx={{
            marginLeft: "11vw",
            marginTop: "3vh",
            width: "40vw",
            // marginBottom: "2vh",
          }}
        >
          <Table sx={{ width: "40vw" ,borderRadius:"15px !important"}} aria-label="customised table">
            <TableHead sx={{ backgroundColor: "#b3d9e6", fontColor: "white",borderRadius:"15px !important" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ paddingLeft: "6vw" }}>Type</TableCell>
                <TableCell align="center">Required</TableCell>
                <TableCell align="right">Unique</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {final.length !== 0 ? (
                final.map((final, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {final.name}
                      </TableCell>
                      <TableCell sx={{ paddingLeft: "6vw" }}>
                        {final.type}
                      </TableCell>
                      <TableCell align="center">{final.required}</TableCell>
                      <TableCell align="right">{final.unique}</TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => {
                            handleDelete(index, e);
                          }}
                          className="input_field_6"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            class="fa-solid fa-trash"
                            style={{ color: "#E9CA16" }}
                          ></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell
                    sx={{
                      paddingLeft: "12vw",
                      color: "gray",
                      fontSize: "1rem",
                    }}
                  >
                    No preview
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <button
          onClick={handleOpen}
          className="btn-1"
          style={{ marginBottom: "5vh", marginTop:"2vh", marginRight: "53vw" }}
        >
          <i
            className="fa-solid fa-database"
            style={{ marginRight: "1vw" }}
          ></i>
          Generate APIs
        </button>
        <Modal
          open={open}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.2rem"}}>
            <i class="fa-regular fa-circle-check" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Success! <span style={{marginRight:"1vw !important"}}>Database Created</span>
            </Typography>
          </Box>
        </Modal>

        <Grid sx={{ marginTop: "3vh" }}></Grid>
      </div>
    </>
  );
};

export default CreateDB;
