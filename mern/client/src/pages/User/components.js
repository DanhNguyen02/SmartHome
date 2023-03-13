import React, { useState } from 'react';
import {IconButton,
        InputAdornment,
        TextField,
        Box,
        Button,
        Typography,
        Link,}
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

const Title = () => {
    return (
        <>
            <Typography component="h1" variant="h5">
                Welcome to
            </Typography>
            <Typography component="h1" variant="h5"
                        sx={{
                            color: '#6C63FF',
                            fontWeight: 'bold',
                        }}>
                Smart Home
            </Typography>
        </> 
    )
}

const AuthButton = (props) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx = {{
                mt: 3,
                p: 2,
                backgroundColor: '#6C63FF',
                fontSize: 12,
                '&:hover': {
                    backgroundColor: 'white',
                    color: '#6C63FF',
                },
            }}>
            {props.label}
        </Button>
    )
}

const DirectPage = (props) => {
    const PageMapping = {
        'login': {
            'text': 'Already have account?',
            'link': 'Register',
            'url': '/register'
        },
        'register': {
            'text': 'Don\'t have an account?',
            'link': 'Login',
            'url': '/login'
        }
    }
    return (
        <Box container sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
            <Typography component="h1" sx={{fontSize: 12}}>
                {PageMapping[props.page]['text']} &nbsp;
            </Typography>
            <Link href={PageMapping[props.page]['url']} sx={{color: '#6C63FF', fontSize: 12}}>
            {PageMapping[props.page]['link']}
            </Link>
        </Box>
    )
}

export {PasswordField,
        SmartHomeImage,
        Field,
        Title,
        AuthButton,
        DirectPage,};