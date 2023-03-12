import React, { useState } from 'react';
import {FormControl,
        Button,
        TextField,
        Grid,
        Box,
        Typography,
        InputAdornment,
        IconButton,
        MenuItem,
        InputLabel,
        Select,}
    from '@mui/material';
import {EmailOutlined,
        VpnKeyOutlined,
        PhotoCameraOutlined,
        AccountCircleOutlined,
        Visibility,
        VisibilityOff,
        PhoneOutlined,
        HomeOutlined,
        PeopleAlt,}
    from '@material-ui/icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import pic from '../../../assets/images/HarryMaguire.png';

export default function Profile() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullname"
                            label="Full name"
                            name="fullname"
                            autoComplete="fullname"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlined />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                ),
                            }}/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 12}}>
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
                        <Grid container justifyItems="flex-start">
                            <FormControl margin="normal">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date of birth"/>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="phone"
                            label="Phone number"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlined />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlined />
                                    </InputAdornment>
                                )
                            }}/>
                    </Grid>
                    <Grid item xs={6} sx={{mt: 4, display: 'flex', px: 12}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                me: 10,
                                p: 2,
                                backgroundColor: 'red',
                                color: 'white',
                                fontSize: 12,
                                width: 120,
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'red',
                                    border: '1px solid red',
                                },
                            }}
                            >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx = {{
                                mx: 6,
                                p: 2,
                                backgroundColor: '#6C63FF',
                                fontSize: 12,
                                width: 120,
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: '#6C63FF',
                                    border: '1px solid #6C63FF',
                                },
                            }}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}