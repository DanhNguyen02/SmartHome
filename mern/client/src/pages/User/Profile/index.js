import React from 'react';
import {FormControl,
        Button,
        Grid,
        Box,
        Typography,
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
        Field}
from '../components';

import pic from '../../../assets/images/HarryMaguire.png';

const GenderSelect = () => {
    return (
        <Grid container justifyItems="flex-start">
            <FormControl margin="normal" sx={{width: 160}}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
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
                        <em>Not select</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

const BirthSelect = () => {
    return (
        <Grid container justifyItems="flex-start">
            <FormControl margin="normal">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date of birth"/>
                </LocalizationProvider>
            </FormControl>
        </Grid>
    )
}

const BottomButton = (props) => {
    const TypeMapping = {
        'cancel': {
            'label': 'Cancel',
            'backgroundColor': 'red'
        },
        'confirm': {
            'label': 'Confirm',
            'backgroundColor': '#6C63FF'
        },
    }

    return (
        <Button
            type={props.type}
            variant="contained"
            sx = {{
                mr: 10,
                p: 2,
                backgroundColor: TypeMapping[props.type]['backgroundColor'],
                fontSize: 12,
                width: 120,
                '&:hover': {
                    backgroundColor: 'white',
                    color: TypeMapping[props.type]['backgroundColor'],
                },
            }}>
            {TypeMapping[props.type]['label']}
        </Button>
    )
}

export default function Profile() {
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
                    <Typography component="h1" variant="h5" sx={{textAlign: 'left'}}>
                        Welcome
                    </Typography>
                    <Typography component="h1" variant="h5"
                                sx={{
                                    color: '#6C63FF',
                                    fontWeight: 'bold',
                                    textAlign: 'left'
                                }}>
                        Harry Marguire
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                    <Box sx={{ width: 120, height: 120 }}>
                        <img
                            alt="Smart home"
                            src={pic}
                            style={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 50,
                                border: '1px solid black', }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx = {{
                            mx: 3,
                            p: 2,
                            backgroundColor: '#6C63FF',
                            fontSize: 12
                        }}
                        startIcon={<PhotoCameraOutlined />}>
                        Change profile picture
                    </Button>
                </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{my: 4}}>
                <Grid container spacing={2} item xs={12} sx={{'& > .MuiGrid-item': {pt: 0}}}>
                    <Grid item xs={6} sx={{px: 12}}>
                        <Field type='fullname' label='Full name'/>
                        <Field type='email' label='Email'/>
                        <PasswordField type='password' label='Password'/>
                        <PasswordField type='confirm-password' label='Confirm password'/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 12}}>
                        <GenderSelect/>
                        <BirthSelect/>
                        <Field type='phone' label='Phone number'/>
                        <Field type='address' label='Address'/>
                    </Grid>
                    <Grid item xs={6} sx={{mt: 4, display: 'flex', px: 12}}>
                        <BottomButton type='cancel'/>
                        <BottomButton type='confirm'/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}