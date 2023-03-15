import React, { useState } from "react";
import {
  Typography,
  Button,
  Breadcrumbs,
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Grid
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../../assets/images/logo.png';

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function AddRoomBox() {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{paddingBottom: '10px'}}>
            Thông tin phòng mới
          </Typography>
          <Typography variant="h6">
            Tên phòng
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={2}
            sx={{width: '100%', paddingBottom: '10px'}}
          />
          <Typography variant="h6">
            Mô tả
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            sx={{width: '100%'}}
          />
          <Grid container spacing={2} sx={{marginTop: '10px'}}>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <Button 
                variant='contained' 
                sx={{
                  background: '#A4B0B6',
                  '&:hover': {
                    background: '#A4B0B6'
                  }
                }}
                onClick={handleClose}
              >
                Hủy bỏ
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' onClick={handleClose}>
                Xác nhận
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }
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
      <Button variant="contained" sx={{marginLeft: 2}} startIcon={<AddIcon />} onClick={handleOpen}>
        Tạo phòng mới
      </Button>
      <AddRoomBox />
      <ListRooms />
    </>
  );
}
export default Rooms;