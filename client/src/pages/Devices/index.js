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
        Button,}
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

const RangeField = ({ type, device={} }) => {
    return (
        <Box sx={{ width: '130px' }}>
            <Typography variant="subtitle1">
                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>
                    { type === 'min' ? 'Ngưỡng thấp nhất' : 'Ngưỡng cao nhất' }
                </p>
            </Typography>
            <TextField
                required
                fullWidth
                id={`${type}-${device.id}`}
                name={`${type}-${device.id}`}
                defaultValue={ type === 'min' ? device.min : device.max }
                type='number'
                autoComplete={`${type}-${device.id}`}
                sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6C63FF',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6C63FF',
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                            { device.type === 'temp' ? '°C' : '%' }
                        </Typography>
                    ),
                }}/>
        </Box>
    )
}

const ShowRange = ({ isAdd, sensor, device={} }) => {
    if (isAdd) {
        if (sensor !== 'none') {
            return (
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }}/>
                    <RangeField type='max' device={{ type: sensor }}/>
                </Box>
            )
        }
    } else if (device.type) {
        if (sensor === 'temp' || sensor === 'humid') {
            return (
                <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }}/>
                    <RangeField type='max' device={{ type: sensor }}/>
                </Box>
            )
        } else if (sensor === 'other') return null;
        else return (
            <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                <RangeField type='min' device={device.type}/>
                <RangeField type='max' device={device.type}/>
            </Box>
        )
    } else return null;   
}  

const ModalButton = (props) => {
    const bgcolor = props.type === 'update' || props.type === 'add' ? '#6C63FF' : 'Red'
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
            {
                (() => {
                    switch (props.type) {
                        case 'add':
                            return 'Thêm';
                        case 'update':
                            return 'Cập nhật';
                        case 'delete':
                            return 'Xóa';
                        default:
                            return '';
                    }
                })()
            }
        </Button>
    )
}

const DeviceModal = ({ isAdd, isModalOpen, setModalOpen, device={} }) => {
    const [sensor, setSensor] = useState('none'); 
    return (
        <Modal 
            open={isModalOpen}
            onClose={() => {setModalOpen(false); setSensor('none');}}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{width: '400px',
                    maxWidth: '80vw',
                    position: 'fixed',
                    top: '2%',
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: '20px',
                    border: 'none' }}>
                
                {/* Title của modal */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h2" sx={{ display: 'flex', mr: 8}}>
                        {
                            isAdd ?
                                <p style={{ margin: "0", color: 'black', fontSize: 16 }}>Thêm thiết bị mới cho phòng</p>
                                :
                                <>
                                    <p style={{ margin: "0", color: 'black', fontSize: 16 }}>{device.name}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <p style={{ margin: '0', color: 'gray', fontSize: 16 }}>&gt;&nbsp;&nbsp;&nbsp;&nbsp;{device.room}</p>
                                </>

                        }
                    </Typography>
                    <IconButton onClick={() => {setModalOpen(false); setSensor('none');}}>
                        <CloseOutlined />
                    </IconButton>
                </Box>

                <Box sx={{m: 3}}>
                    <FormControl fullWidth>

                        {/* Nhập tên thiết bị */}
                        <Box sx={{mb: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Tên thiết bị</p>
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id={'name-' + device.id}
                                name={'name-' + device.id}
                                defaultValue={device.name}
                                autoComplete={'name-' + device.id}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF',
                                    },
                                    
                                }}/>
                        </Box>

                        {/* Nhập feed key cho thiết bị */}
                        <Box sx={{mb: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Feed key</p>
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id={'feed-' + device.id}
                                name={'feed-' + device.id}
                                defaultValue={device.feed}
                                autoComplete={'feed-' + device.id}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF',
                                    },
                                    
                                }}/>
                        </Box>

                        {/* Chọn loại thiết bị */}
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
                                    <InputLabel id="type-select-label">Loại thiết bị</InputLabel>
                                    <Select
                                        labelId="type-select-label"
                                        label="Loại thiết bị"
                                        id={'type-' + device.id}
                                        defaultValue={device.type}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            if (selectedValue === 'temp') setSensor('temp');
                                            else if (selectedValue === 'humid') setSensor('humid');
                                            else setSensor('other');
                                        }}>
                                        <MenuItem value="light">Đèn</MenuItem>
                                        <MenuItem value="fan">Quạt</MenuItem>
                                        <MenuItem value="temp">Cảm biến nhiệt độ</MenuItem>
                                        <MenuItem value="humid">Cảm biến độ ẩm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Box>

                        {/* Nhập mô tả */}
                        <Box sx={{my: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Mô tả</p>
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                id={'description-' + device.id}
                                name={'description-' + device.id}
                                autoComplete={'description-' + device.id}
                                value={device.description}
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#6C63FF',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6C63FF',
                                    },
                                }}/>
                        </Box>

                        {/* Nhập ngưỡng giới hạn cho thiết bị */}
                        <ShowRange isAdd={isAdd} sensor={sensor} device={device}/>

                        {/* Nút bấm cho modal */}
                        <Box sx={{my: 1, display: 'flex', justifyContent: 'center'}}>
                            {
                                isAdd ?
                                    <ModalButton type='add'/>                                    
                                    : 
                                    <>
                                        <ModalButton type='delete'/>
                                        <ModalButton type='update'/> 
                                    </> 
                            }
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    )
}

const AddDevice = () => {
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

const SwitchItem = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);

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
            <DeviceModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} device={{ type: 'temp' }}/>
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