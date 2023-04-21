import React, { useState, useEffect } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const GetDevices = async () => {
    const path = window.location.pathname;
    const id = path.split('/')[2];
    const response = await axios.get('http://localhost:5000/api/devices', {
        params: {
            room: id
        }
    });
    
    return response.data;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

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
                id={type}
                name={type}
                defaultValue={ type === 'min' ? device.min : device.max }
                type='number'
                autoComplete={type}
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
        if (sensor !== 'none' && sensor !== 'other') {
            return (
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }}/>
                    <RangeField type='max' device={{ type: sensor }}/>
                </Box>
            )
        } else return null;
    } else if (device.type) {
        if (sensor === 'temp' || sensor === 'humi') {
            return (
                <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={{ type: sensor }}/>
                    <RangeField type='max' device={{ type: sensor }}/>
                </Box>
            )
        } else if (sensor === 'other') return null;
        else if (sensor === 'none' && (device.type === 'temp' || device.type === 'humi')) {
            return (
                <Box sx={{my: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <RangeField type='min' device={device}/>
                    <RangeField type='max' device={device}/>
                </Box>
            )
        }
    } else return null;   
}  

const ModalButton = (props) => {
    const bgcolor = props.type === 'update' || props.type === 'add' ? '#6C63FF' : 'Red'
    return (
        <Button
            type="submit"                   
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
    const formik = useFormik({
        initialValues: {
            name: '',
            feed: '',
            type: '',
            min: '',
            max: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required('Tên không được để trống'),
            feed: Yup
                .string()
                .required('Feed key không được để trống'),
            type: Yup
                .string()
                .required('Loại thiết bị không được để trống'),
        }),
        onSubmit: async (values) => {
            try {
                const path = window.location.pathname;
                const id = path.split('/')[2];
                // await axios.post('http://localhost:5000/api/devices', {
                //     room: id,
                //     name: values.name,
                //     feed: values.feed,
                //     type: values.type,
                // });
                console.log(values)
            } catch (error) {
                console.error(error);
            }
        },
    });
    const [sensor, setSensor] = useState('none'); 
    return (
        <Modal 
            open={isModalOpen}
            onClose={() => {setModalOpen(false); setSensor('none'); formik.setTouched({});}}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{width: '400px',
                    maxWidth: '80vw',
                    position: 'fixed',
                    top: '10%',
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
                    <IconButton onClick={() => {setModalOpen(false); setSensor('none'); formik.setTouched({});}}>
                        <CloseOutlined />
                    </IconButton>
                </Box>

                <Box sx={{m: 3}} >
                    <FormControl fullWidth noValidate onSubmit={formik.handleSubmit}>
                        {/* Nhập tên thiết bị */}
                        <Box sx={{mb: 1}}>
                            <Typography variant="subtitle1">
                                <p style={{ margin: "0", color: 'gray', fontSize: 12}}>Tên thiết bị</p>
                            </Typography>
                            <TextField
                            required
                            fullWidth
                            id='name'
                            name='name'
                            autoComplete={'name'}
                            error={formik.touched['name'] && Boolean(formik.errors['name'])}
                            helperText={formik.touched['name'] && formik.errors['name']}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={device.name || formik.values['name']}
                            sx={{
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#6C63FF',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6C63FF',
                                },
                                "input::-ms-reveal, input::-ms-clear": {
                                    display: "none",
                                }
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
                                id='feed'
                                name='feed'
                                defaultValue={device.feed}
                                error={formik.touched['feed'] && Boolean(formik.errors['feed'])}
                                helperText={formik.touched['feed'] && formik?.errors['feed']}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                autoComplete='feed'
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
                                        id='type'
                                        name='type'
                                        required
                                        defaultValue={device.type}
                                        error={formik.touched['type'] && Boolean(formik.errors['type'])}
                                        helperText={formik.touched['type'] && formik?.errors['type']}
                                        onBlur={formik.handleBlur}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            if (selectedValue === 'temp') setSensor('temp');
                                            else if (selectedValue === 'humi') setSensor('humi');
                                            else setSensor('other');
                                        }}>
                                        <MenuItem value="light">Đèn</MenuItem>
                                        <MenuItem value="fan">Quạt</MenuItem>
                                        <MenuItem value="temp">Cảm biến nhiệt độ</MenuItem>
                                        <MenuItem value="humi">Cảm biến độ ẩm</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
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
    const device = props.device;
    const IconMapping = {
        'light': LightIcon,
        'fan': FanIcon,
        'temp': SensorIcon,
        'humi': SensorIcon,
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
                    src={IconMapping[device['type']]}
                    alt="icon"
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                    }}/>
                <p style={{marginBottom: '0', color: 'black'}}>{device['name']}&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </Box>
            <DeviceModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} device={device}/>
        </>
    )
}

export default function Page () {
    const [roomName, setRoomName] = useState(undefined);
    const [listDevices, setListDevices] = useState(null);
    useEffect(() => {
        async function fetchDevices() {
            const response = await GetDevices();
            setListDevices(response);
        }
        fetchDevices();
    }, []);
    useEffect(() => {
        async function fetchRoom() {
            const path = window.location.pathname;
            const id = path.split('/')[2];
            const response = await axios.get('http://localhost:5000/api/rooms');
            const room = await response.data;
            setRoomName(room[id]['name']);
        };
        fetchRoom();
     }
    , []);
    const lights = listDevices?.filter(device => device.type === 'light');
    const fans = listDevices?.filter(device => device.type === 'fan');
    const sensors = listDevices?.filter(device => device.type === 'temp' || device.type === 'humi');
    return (
        <Grid spacing={2} sx={{m: 4}}>
            <Grid xs={12} sx={{p: 1, display: 'flex', alignItems: 'center'}}>
                <Typography color='primary' sx={{ display: 'flex', mr: 2, fontWeight: 'bold', fontSize: '1.25rem', color: 'secondary'}}>
                    <p style={{ color: 'grey', fontWeight: 'bold', marginBottom: '0'}}>
                        {roomName}&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    Thiết bị và Cảm biến
                </Typography>
                <AddDevice/>
            </Grid>
            <Grid container sx={{my: 2}}>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Đèn</Typography>
                        {lights?.length ? lights.map((device, id) => (
                            <SwitchItem id={id} device={device} />
                        )) : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item>                     
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Đèn</Typography>
                        {fans?.length ? fans.map((device, id) => (
                            <SwitchItem id={id} device={device} />
                        )) : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item> 
                </Grid>
                <Grid xs={4} sx={{p: 1}}>
                    <Item>
                        <Typography sx={{mb: 3}}>Cảm biến</Typography>
                        {sensors?.length ? sensors.map((device, id) => (
                            <SwitchItem id={id} device={device} />
                        )) : <Typography sx={{color: 'black', textAlign: 'center'}}> Không có thiết bị </Typography>}
                    </Item> 
                </Grid>
            </Grid>
        </Grid>
    )
}