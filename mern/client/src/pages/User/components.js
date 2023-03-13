import React, { useState } from 'react';
import {IconButton,
        InputAdornment,
        TextField,
        Box,}
    from "@mui/material";
import {Visibility,
        VisibilityOff,
        VpnKeyOutlined,
        EmailOutlined,
        AccountCircleOutlined,
        PhoneOutlined,
        HomeOutlined,}
    from "@material-ui/icons";

import pic from '../../assets/images/login-register.png';

const SmartHomeImage = () => {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <img
                alt="Smart home"
                src={pic}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </Box>
    )
}

const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            name={props.type}
            label={props.label}
            type={showPassword ? 'text' : 'password'}
            id={props.type}
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
    )
}

const Field = (props) => {
    const IconMapping = {
        'email': <EmailOutlined/>,
        'fullname': <AccountCircleOutlined/>,
        'phone': <PhoneOutlined/>,
        'address': <HomeOutlined/>
    }
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={props.type}
            label={props.label}
            name={props.type}
            autoComplete={props.type}
            autoFocus
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {IconMapping[props.type]}
                    </InputAdornment>
                ),
            }}/>
    )
}

export {PasswordField,
        SmartHomeImage,
        Field,};