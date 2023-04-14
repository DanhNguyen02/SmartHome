import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import {Grid,
        Box,
        Typography,
        Paper,
        Modal,
        IconButton,
        TextField,
        MenuItem,
        FormControl,
        InputLabel,
        Select,
        Button,
        RadioGroup,
        Radio,
        FormControlLabel,}
    from '@mui/material';

import {CloseOutlined,}
    from "@material-ui/icons";

import LightIcon from "../../assets/images/lightIcon.png";
import FanIcon from "../../assets/images/fanIcon.png";
import SensorIcon from "../../assets/images/sensorIcon.png";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const Data = [
    {
        'id': '1',
        'type': 'light',
        'name': 'Đèn trần 1',
        'room': 'Phòng khách'
    },
    {
        'id': '2',
        'type': 'light',
        'name': 'Đèn trần 2',
        'room': 'Phòng khách'
    },
    {
        'id': '3',
        'type': 'light',
        'name': 'Đèn toilet',
        'room': 'Phòng vệ sinh'
    },
    {
        'id': '4',
        'type': 'light',
        'name': 'Đèn ngủ',
        'room': 'Phòng ngủ'
    },
    {
        'id': '5',
        'type': 'fan',
        'name': 'Quạt 1',
        'room': 'Phòng khách'
    },
    {
        'id': '6',
        'type': 'fan',
        'name': 'Quạt 2',
        'room': 'Phòng ngủ'
    },
    {
        'id': '7',
        'type': 'sensor',
        'name': 'Nhiệt độ',
        'room': 'Phòng khách'
    },
    {
        'id': '8',
        'type': 'sensor',
        'name': 'Độ ẩm',
        'room': 'Phòng khách'
    },
]

const DeviceModal = ({ isAdd, isModalOpen, setModalOpen, id, name, room }) => {
    return (
        <Modal 
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box sx={{width: '400px',
                    maxWidth: '80vw',
                    position: 'fixed',
                    top: '7%',
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: '20px',
                    border: 'none' }}>
                {!isAdd && <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h2" sx={{ display: 'flex', mr: 8}}>
                        <p style={{ margin: "0", color: 'black', fontSize: 16}}>{name}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p style={{margin: '0', color: 'gray', fontSize: 16}}>&gt;&nbsp;&nbsp;&nbsp;&nbsp;{room}</p>
                    </Typography>
                    <IconButton onClick={() => setModalOpen(false)}>
                        <CloseOutlined />
                    </IconButton>
                </Box>}
                <Box sx={{m: 3}}>
                    <FormControl fullWidth>
                        <Box sx={{mb: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Tên thiết bị</p>
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id={'name-' + id}
                                name={'name-' + id}
                                defaultValue={name}
                                autoComplete={'name-' + id}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF',
                                    },
                                    
                                }}/>
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Mô tả</p>
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                id={'description-' + id}
                                name={'description-' + id}
                                autoComplete={'description-' + id}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF',
                                    },
                                }}/>
                        </Box>
                        <Box sx={{my: 1}}>
                            <Grid container justifyItems="flex-start" sx={{my: 1}}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF'
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF'
                                    }
                                    }}>
                                    <InputLabel 
                                        id="room-select-label">
                                        Phòng
                                    </InputLabel>
                                    <Select
                                        labelId="room-select-label"
                                        id={'room-' + id}
                                        label="Room"
                                        defaultValue={room}
                                        sx={{
                                            
                                        }}>
                                        <MenuItem value="living">Phòng khách</MenuItem>
                                        <MenuItem value="bed">Phòng ngủ</MenuItem>
                                        <MenuItem value="toilet">Phòng vệ sinh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Box>                
                        <Box sx={{my: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Chế độ</p>
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="mode" name="mode" defaultValue="auto">
                                    <FormControlLabel
                                        value="auto"
                                        control={<Radio />}
                                        label="Tự động"
                                        sx={{'& .Mui-checked .MuiSvgIcon-root': {color: '#6C63FF'}}}/>
                                    <FormControlLabel
                                        value="manual"
                                        control={<Radio />}
                                        label="Thủ công"
                                        sx={{'& .Mui-checked .MuiSvgIcon-root': {color: '#6C63FF'}}}/>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{my: 1, display: 'flex', justifyContent: 'center'}}>
                            <ModalButton type='delete'/>
                            <ModalButton type='update'/>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    )
    
}

const ModalButton = (props) => {
    const bgcolor = props.type === 'update' ? '#6C63FF' : 'Red'
    return (
        <Button
            type="button"                   
            variant="contained"
            sx = {{
                mt: 3,
                mx: 2,
                p: 1,
                width: 100,
                borderRadius: '15px',
                backgroundColor: bgcolor,
                fontSize: 12,
                '&:hover': {
                    backgroundColor: 'white',
                    color: bgcolor,
                },
            }}>
            {props.type === 'update' ? 'Cập nhật' : 'Xóa'}
        </Button>
    )
}

const SwitchItem = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const RoomMapping = {
        'Phòng khách': 'living',
        'Phòng ngủ': 'bed',
        'Phòng vệ sinh': 'toilet',
    }

    const IconMapping = {
        'light': LightIcon,
        'fan': FanIcon,
        'sensor': SensorIcon
    }

    let device = () => {
        for (let i in Data) {
            if (Data[i]['id'] === props.id) {
                return Data[i];
            }
        }
    }

    return (
        <>
            <Box 
                onClick={() => setModalOpen(true)}
                sx={{
                    p: 1,
                    mt: "10px",
                    display: "flex",
                    borderRadius: '10px',
                    alignItems: 'center',
                    borderBottom: "1px solid #DBE5EB",
                    "&:hover": {
                        backgroundColor: "#6C63FF",
                        cursor: "pointer",
                    },
                }}>
                <img
                    src={IconMapping[device()['type']]}
                    alt="icon"
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                    }}/>
                <p style={{marginBottom: '0', color: 'black'}}>{device()['name']}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p style={{marginBottom: '0',}}>&gt;&nbsp;&nbsp;&nbsp;&nbsp;{device()['room']}</p>
            </Box>
            <Modal 
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Box sx={{width: '400px',
                        maxWidth: '80vw',
                        position: 'fixed',
                        top: '7%',
                        bgcolor: 'background.paper',
                        p: 2,
                        borderRadius: '20px',
                        border: 'none' }}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h2" sx={{ display: 'flex', mr: 8}}>
                            <p style={{ margin: "0", color: 'black', fontSize: 16}}>{device()['name']}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <p style={{margin: '0', color: 'gray', fontSize: 16}}>&gt;&nbsp;&nbsp;&nbsp;&nbsp;{device()['room']}</p>
                        </Typography>
                        <IconButton onClick={() => setModalOpen(false)}>
                            <CloseOutlined />
                        </IconButton>
                    </Box>
                    <Box sx={{m: 3}}>
                        <FormControl fullWidth>
                            <Box sx={{mb: 1}}>
                                <Typography variant="subtitle1">
                                    <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Tên thiết bị</p>
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id={'name-' + props.id}
                                    name={'name-' + props.id}
                                    defaultValue={device()['name']}
                                    autoComplete={'name-' + props.id}
                                    sx={{
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#6C63FF',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#6C63FF',
                                        },
                                        
                                    }}/>
                            </Box>
                            <Box sx={{my: 1}}>
                                <Typography variant="subtitle1">
                                    <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Mô tả</p>
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    id={'description-' + props.id}
                                    name={'description-' + props.id}
                                    autoComplete={'description-' + props.id}
                                    sx={{
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#6C63FF',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#6C63FF',
                                        },
                                    }}/>
                            </Box>
                            <Box sx={{my: 1}}>
                                <Grid container justifyItems="flex-start" sx={{my: 1}}>
                                    <FormControl
                                        fullWidth
                                        sx={{
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#6C63FF'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#6C63FF'
                                        }
                                        }}>
                                        <InputLabel 
                                            id="room-select-label">
                                            Phòng
                                        </InputLabel>
                                        <Select
                                            labelId="room-select-label"
                                            id={'room-' + props.id}
                                            label="Room"
                                            defaultValue={RoomMapping[device()['room']]}
                                            sx={{
                                                
                                            }}>
                                            <MenuItem value="living">Phòng khách</MenuItem>
                                            <MenuItem value="bed">Phòng ngủ</MenuItem>
                                            <MenuItem value="toilet">Phòng vệ sinh</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Box>                
                            <Box sx={{my: 1}}>
                                <Typography variant="subtitle1">
                                    <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Chế độ</p>
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="mode" name="mode" defaultValue="auto">
                                        <FormControlLabel
                                            value="auto"
                                            control={<Radio />}
                                            label="Tự động"
                                            sx={{'& .Mui-checked .MuiSvgIcon-root': {color: '#6C63FF'}}}/>
                                        <FormControlLabel
                                            value="manual"
                                            control={<Radio />}
                                            label="Thủ công"
                                            sx={{'& .Mui-checked .MuiSvgIcon-root': {color: '#6C63FF'}}}/>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box sx={{my: 1, display: 'flex', justifyContent: 'center'}}>
                                <ModalButton type='delete'/>
                                <ModalButton type='update'/>
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

const AddDevice = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Button
                type="submit"
                onClick={() => setModalOpen(true)}
                variant="contained"
                sx = {{
                    mx: 2, 
                    p: 1,
                    backgroundColor: '#6C63FF',
                    fontSize: 12,
                    width: 120,
                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#6C63FF',
                    },
                }}>
                Thêm thiết bị
            </Button>
            <DeviceModal isAdd={true} isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
        </>
    )
}


export default function Page () {
    return (
        <Grid spacing={2} sx={{m: 4}}>
            <Grid xs={12} sx={{p: 1, display: 'flex', alignItems: 'center'}}>
                <Typography color='primary' sx={{mr: 2, fontWeight: 'bold', fontSize: '1.25rem', color: 'secondary'}}>
                    Thiết bị và Cảm biến
                </Typography>
                <AddDevice/>
            </Grid>
            <Grid container sx={{my: 2}}>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Đèn</Typography>
                        <SwitchItem id='1'/>
                        <SwitchItem id='2'/>
                        <SwitchItem id='3'/>
                        <SwitchItem id='4'/>
                    </Item>                     
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Thiết bị</Typography>
                        <SwitchItem id='5'/>
                        <SwitchItem id='6'/>
                    </Item> 
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Cảm biến</Typography>
                        <SwitchItem id='7'/>
                        <SwitchItem id='8'/>
                    </Item> 
                </Grid>
            </Grid>
        </Grid>
    )
}