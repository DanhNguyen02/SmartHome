import React from 'react';
import {FormControl,
        Button,
        Grid,
        Box,
        InputAdornment,
        MenuItem,
        InputLabel,
        Select,}
    from '@mui/material';
import {PhotoCameraOutlined,
        PeopleAlt,}
    from '@material-ui/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {PasswordField,
        Field,
        Title}
from '../components';

import pic from '../../../assets/images/TruongAnhNgoc.jpg';

const ProfilePicture = () => {
    return (
        <>
            <Box sx={{ width: 120, height: 120 }}>
                <img
                    alt="Smart home"
                    src={pic}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 50,
                        border: '1px solid black', }}/>
            </Box>
            <Button
                type="submit"
                variant="contained"
                sx = {{
                    mx: 3,
                    p: 2,
                    backgroundColor: '#6C63FF',
                    fontSize: 12,
                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#6C63FF',
                    },
                }}
                startIcon={<PhotoCameraOutlined/>}>
                Đổi ảnh đại diện
            </Button>
        </>
    )
}

const GenderSelect = () => {
    return (
        <Grid container justifyItems="flex-start">
            <FormControl
                margin="normal"
                sx={{width: 160,
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6C63FF'
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6C63FF'
                    }}}>
                <InputLabel id="gender-select-label">Giới tính</InputLabel>
                <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    label="Gender"
                    defaultValue="null"
                    startAdornment={
                        <InputAdornment position="start">
                            <PeopleAlt />
                        </InputAdornment>}>
                    <MenuItem value="null" defaultValue>
                        <em>Chưa chọn</em>
                    </MenuItem>
                    <MenuItem value="male">Nam</MenuItem>
                    <MenuItem value="female">Nữ</MenuItem>
                    <MenuItem value="other">Khác</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

const BirthSelect = () => {
    return (
        <Grid container justifyItems="flex-start">
            <FormControl
                margin="normal"
                sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6C63FF'
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6C63FF'
                    }
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Ngày sinh"/>
                </LocalizationProvider>
            </FormControl>
        </Grid>
    )
}

const ConfirmButton = () => {
    return (
        <Button
            type="submit"
            variant="contained"
            sx = {{
                mr: 6,
                p: 2,
                backgroundColor: '#6C63FF',
                fontSize: 12,
                width: 120,
                '&:hover': {
                    backgroundColor: 'white',
                    color: '#6C63FF',
                },
            }}>
            Xác nhận
        </Button>
    )
}

export default function Page() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Grid container spacing={2} sx={{ alignItems: 'center', mt: 4, pl: 8, '& > .MuiGrid-item': {pl: 0, pt: 0}}}>
            <Grid item xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Title fullname="Trương Anh Ngọc"/>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                    <ProfilePicture/>
                </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{my: 4}}>
                <Grid container spacing={2} item xs={12} sx={{'& > .MuiGrid-item': {pt: 0}}}>
                    <Grid item xs={6} sx={{px: 12}}>
                        <Field type='fullname' label='Họ và tên'/>
                        <Field type='email' label='Địa chỉ email'/>
                        <PasswordField type='password' label='Mật khẩu'/>
                        <PasswordField type='confirm-password' label='Xác nhận mật khẩu'/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 12}}>
                        <GenderSelect/>
                        <BirthSelect/>
                        <Field type='phone' label='Số điện thoại'/>
                        <Field type='address' label='Địa chỉ'/>
                    </Grid>
                    <Grid item xs={6} sx={{mt: 4, display: 'flex', px: 12}}>
                        <ConfirmButton/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}