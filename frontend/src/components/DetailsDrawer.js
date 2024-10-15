import React from "react";
import { Drawer, Button, Typography, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const DetailsDrawer = ({
  drawerWidth,
  topBarHeight,
  goBackToSidebar,
  selectedFieldName,
  setSelectedFieldName,
  selectedFieldCoords,
  handleEditField,
  DataFetch,
  polygons,
  PolygonInfo,
  open,
  setOpen,
}) => {
    const handleEdit  = (name)=>{
        setSelectedFieldName("Field 2")

    };
  const handleDelete = async (name) => {
    try {
      // Call the delete endpoint with the field name
      await fetch(
        `http://localhost:3000/api/delete-field/${encodeURIComponent(name)}`,
        {
          method: "DELETE",
        }
      );
      DataFetch();
      goBackToSidebar();
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  return (
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
      variant="temporary"
      anchor="left"
      open={open}
      ModalProps={{hideBackdrop: true}}
    >
      <div
        style={{
          padding: "32px",

          //NEW
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            onClick={goBackToSidebar}
            variant="outlined"
            color="inherit"
            style={{ marginBottom: "32px" }}
          >
            Back
          </Button>
          <Divider />

          <Typography
            variant="h5"
            color="white"
            style={{ marginBottom: "16px", border: "2px solid  transparent" }}
          >
            {selectedFieldName}
          </Typography>
          
          {/* <Divider /> */}

          {/* <Typography
            variant="body2"
            color="gray"
            style={{ border: "2px solid transparent" }}
          >
            Coordinates: {selectedFieldCoords}
          </Typography> */}
                  <div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {/* <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 16 }}
              >
                {selectedFieldName} Notes
              </Typography> */}

              <Typography variant="h6" component="div">
                Coordinates{" "}
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {selectedFieldCoords}
              </Typography>

              {/* <Typography variant="body2">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.{" "}
              </Typography> */}
            </CardContent>
          </Card>
        </div>
          <Divider />
        </div>



        {/*  Field Note*/}
        <div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 16 }}
              >
                {selectedFieldName} Notes
              </Typography>

              {/* <Typography variant="h5" component="div">
                Lorem Ipsum
              </Typography> */}

              {/* <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                adjective
              </Typography> */}

              <Typography variant="body2">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.{" "}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined" color="inherit">
                + Add Note
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* This div wraps the buttons to place them at the bottom */}
        <div
          style={{
            marginBottom: "50px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            border: "2px solid  transparent",
          }}
        >
          {/* Add margin to create space above the bottom */}
          <Button
            onClick={() => handleEdit(selectedFieldName)} // Correct usage
            variant="outlined"
            color="inherit"
            style={{ marginTop: "16px" }}
          >
            Edit Name
          </Button>
          <Button
            onClick={() => handleDelete(selectedFieldName)} // Correct usage
            variant="outlined"
            color="inherit"
            style={{ marginTop: "16px" }}
          >
            Delete Field
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default DetailsDrawer;
