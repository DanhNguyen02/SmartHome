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
  Grid,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Dropdown } from 'react-bootstrap';
import rooms from '../../assets/data/rooms.json';
import Logo from '../../assets/images/logo.png';

function Rooms() {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
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
        open={openAdd}
        onClose={handleCloseAdd}
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
                onClick={handleCloseAdd}
              >
                Hủy bỏ
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' onClick={handleCloseAdd}>
                Xác nhận
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }
  function EditRoomBox(props) {
    console.log(props)
    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{paddingBottom: '10px'}}>
            Cập nhật thông tin phòng
          </Typography>
          <Typography variant="h6">
            Tên phòng
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={2}
            sx={{width: '100%', paddingBottom: '10px'}}
            defaultValue={props.name}
          />
          <Typography variant="h6">
            Mô tả
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            sx={{width: '100%'}}
            defaultValue={props.description}
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
                onClick={handleCloseEdit}
              >
                Hủy bỏ
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' onClick={handleCloseEdit}>
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
      <Card sx={{ display: 'flex', margin: 4, boxShadow: '1px 1px 1px 1px grey', position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image={Logo}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {room.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              {room.description}
            </Typography>
          </CardContent>
        </Box>
        <Dropdown style={{position: 'absolute', right: 0}}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm"/>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenEdit}>
              Chỉnh sửa
            </Dropdown.Item>
            <Dropdown.Item>Xóa</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <EditRoomBox 
          id={room.id}
          name={room.name}
          description={room.description} 
        />
      </Card>
    )))
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '20px' }}>
        <Typography color="text.primary">Danh sách phòng</Typography>
      </Breadcrumbs>
      <Button variant="contained" sx={{marginLeft: 2}} startIcon={<AddIcon />} onClick={handleOpenAdd}>
        Tạo phòng mới
      </Button>
      <AddRoomBox />
      <ListRooms />
    </>
  );
}
export default Rooms;