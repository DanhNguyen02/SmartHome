import React, { useState } from "react";
import {
  Typography,
  Button,
  Breadcrumbs,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../../assets/images/logo.png';
import { Dropdown } from "react-bootstrap";

function Rooms() {
  const rooms = [
    {
      id: 1,
      name: "Phòng khách",
      description: "Cũng là phòng khách"
    },
    {
      id: 2,
      name: "Phòng bếp",
      description: "Cũng là phòng bếp"
    },
    {
      id: 3,
      name: "Phòng ngủ",
      description: "Cũng là phòng ngủ"
    },
  ]
  
  function ListRooms() {
    return(rooms.map((room) => (
      <Card sx={{ display: 'flex', margin: 4, boxShadow: '1px 1px 1px 1px grey' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={Logo}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {room.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {room.description}
            </Typography>
          </CardContent>
        </Box>
        <MoreVertIcon 
          sx={{position: 'absolute', right: 35, fontSize: 35, marginTop: 1}}
        />
      </Card>
    )))
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '20px' }}>
        <Typography color="text.primary">Danh sách phòng</Typography>
      </Breadcrumbs>
      <Button variant="contained" startIcon={<AddIcon />}>
        Tạo phòng mới
      </Button>
      <ListRooms />
    </>
  );
}
export default Rooms;