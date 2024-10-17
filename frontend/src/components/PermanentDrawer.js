import DetailsDrawer from "./DetailsDrawer"; // Adjust the path as necessary


import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FieldDetails from "./FieldDetails"; // Import your FieldDetails component
import { ThemeProvider, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TypeSearch from "./Search.tsx";

const drawerWidth = 340;
const topBarHeight = 64;

const PermanentDrawer = ({
  polygons,
  user,
  selectedFieldName,
  setSelectedFieldName,
  DataFetch,
  setIsDrawing,
  setSnackBarOpen,
  addField,
  setAddField,
  mapType,
  setMapType,
}) => {
  const [polygonInfo, setPolygonInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFieldCoords, setSelectedFieldCoords] = useState();

  const handlePolygons = () => {
    const formattedPolygons = polygons.map((polygon, index) => ({
      index,
      name: polygon.name || `Field ${index}`, // Use polygon name if available
      path: polygon.path || [], // Include the path in the state
    }));
    setPolygonInfo(formattedPolygons);
  };

  useEffect(() => {
    if (polygons) {
      handlePolygons();
    }
    console.log(polygons);
  }, [polygons]);

  useEffect(() => {
    if (selectedFieldName) {
      getCoords(selectedFieldName);
      setOpen(true);
    }
  }, [selectedFieldName]);

  useEffect(() => {
    if (selectedFieldCoords) {
      // alert("COORDS ARE:: " + selectedFieldCoords)
    }
  }, [selectedFieldCoords]);

  const handleLogout = () => {
    window.location.href = "http://localhost:3000/api/logout"; // Adjust the logout URL as needed
  };

  const getCoords = (field) => {
    const selectedPolygon = polygons.find(
      (polygon) => polygon.name == selectedFieldName
    );
    const coordinates = selectedPolygon.path
      .map((coord) => `(${coord.lng.toFixed(1)}, ${coord.lat.toFixed(1)})`)
      .join(", ");
    // alert(coordinates);
    setSelectedFieldCoords(coordinates);
  };

  const openDetailsPage = (field) => {
    setSelectedFieldName(field);
  };

  const goBackToSidebar = () => {
    setSelectedFieldName(null);
    setSelectedFieldCoords(null);
    setOpen(false);
  };

  const handleDeleteField = () => {
    // Logic for deleting the field
    alert(`Field ${selectedFieldName} deleted!`);
    goBackToSidebar();
  };

  const handleEditField = () => {
    // Logic for editing the field name
    alert(`Editing field ${selectedFieldName}`);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2D333A",
      },
    },

    typography: {
      allVariants: {
        fontFamily: "serif",
      },
    },
  });

  const handleAddField = () => {
    setAddField(!addField);
    setSnackBarOpen(true);
    setIsDrawing(true);
  };

  const handleCancelField = () => {
    setAddField(!addField);
    setSnackBarOpen(false);
    setIsDrawing(false);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <DetailsDrawer
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
          topBarHeight={topBarHeight}
          goBackToSidebar={goBackToSidebar}
          selectedFieldName={selectedFieldName}
          setSelectedFieldName={setSelectedFieldName}
          selectedFieldCoords={selectedFieldCoords}
          handleEditField={handleEditField}
          DataFetch={DataFetch}
          polygons={polygons}
          polygonInfo={polygonInfo}
          setPolygonInfo={setPolygonInfo}
        />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            marginTop: `${topBarHeight}px`, // Push drawer below TopBar
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: `${topBarHeight}px`, // Apply margin to drawer paper
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* top div */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%", // Ensures the container takes the full height of the sidebar
            }}
          >
            {/* 001 FUNCTIONALITY */}
            <div style={{ border: "0px solid red" }}>
              {/* 0. ADD FIELD BUTTON */}
              {/* <div
                style={{
                  border: "3px solid violet",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    border: "3px solid transparent",
                    textAlign: "center",
                    width: "60%",
                  }}
                >
                  <Typography variant="h6" component="div">
                    User Fields
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "20px",
                    border: "0px solid transparent",
                  }}
                >
                  <Box sx={{ "& > :not(style)": { m: 0 } }}>
                    <Fab
                      size="small"
                      color="default"
                      aria-label="add"
                      onClick={handleAddField}
                    >
                      <AddIcon />
                    </Fab>
                  </Box>
                </div>
              </div> */}
              {/*________________ */}

              {/* 1. ADD FIELD BUTTON */}
              <div style={{ border: "0px solid yellow" }}>
                {addField ? (
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "green",
                      width: "calc(100% - 32px)", // Adjust width to account for right margin
                      height: "50px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "16px",
                    }}
                    onClick={handleAddField}
                    variant="contained"
                  >
                    Add new Field
                  </Button>
                ) : (
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "red",
                      width: "calc(100% - 32px)", // Adjust width to account for right margin
                      height: "50px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "16px",
                    }}
                    onClick={handleCancelField}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                )}
              </div>
              {/*________________ */}

              {/* 2. MAP TYPE */}
              {/* <div style={{border: "0px solid blue", marginRight:"32px",display: "flex", justifyContent: "flex-end"}}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 120, marginBottom: "16px" }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    View
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={mapType}
                    onChange={(event) => setMapType(event.target.value)}
                    label="View"
                  >
                    <MenuItem value={"ROADMAP"}>
                      ROADMAP
                    </MenuItem>
                    <MenuItem value={"SATELLITE"}>
                      SATELLITE
                    </MenuItem>
                    <MenuItem value={"HYBRID"}>
                      HYBRID
                    </MenuItem>
                    <MenuItem value={"TERRAIN"}>
                      TERRAIN
                    </MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              {/*________________ */}

              {/* 3. FIELDS */}
              <Divider></Divider>
              <div style={{ border: "0px solid green" }}>
                <div
                  style={{
                    border: "5px solid transparent",
                    textAlign: "center",
                    width: "60%",
                  }}
                >
                  <Typography variant="h6" component="div">
                    User Fields
                  </Typography>
                </div>
                <Divider></Divider>

                {/* List of Items */}
                <List>
                  {polygonInfo.map((field) => (
                    <ListItem key={field.name} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          openDetailsPage(field.name);
                        }}
                      >
                        <ListItemIcon>
                          <LayersIcon />
                        </ListItemIcon>

                        <ListItemText variant="h5" primary={field.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
              {/*________________ */}

              {/* 4. Search */}
              <div>
                {/* <SearchBar
                cancelOnEscape	
                  value={selectedFieldName}
                  onChange={(value) => setState({dataSource: [ value, value+value, value+value+value]})}
                  // onChange={(newValue) => this.setState({ value: newValue })}
                  onRequestSearch={() => console.log('onRequestSearch')}
                  /> */}
              </div>
              {/* ______________--- */}
            </div>
            {/*________________ */}

            {/*002 USER DETAILS*/}
            <div>
              {/* 1. INFO*/}
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Avatar src="avatar.png" />
                  <div>
                    <Typography variant="h6" color="white">
                      {user.displayName}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {user.id}
                    </Typography>
                  </div>
                  <Button onClick={handleLogout} color="inherit">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            {/*________________ */}
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default PermanentDrawer;
