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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </Box>
    )
}

const PasswordField = ({formik, type, label}) => {
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
            name={type}
            label={label}
            type={showPassword ? 'text' : 'password'}
            id={type}
            autoComplete={type}
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
                            edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={formik.touched[type] && Boolean(formik.errors[type])}
            helperText={formik.touched[type] && formik.errors[type]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[type]}
            sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6C63FF',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6C63FF',
                },
            }}/>
    )
}

const Field = ({formik=null, type, label}) => {
    const IconMapping = {
        'email': <EmailOutlined/>,
        'fullname': <AccountCircleOutlined/>,
        'phone': <PhoneOutlined/>,
        'address': <HomeOutlined/>
    };
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={type}
            label={label}
            name={type}
            autoComplete={type}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    {IconMapping[type]}
                    </InputAdornment>
                ),
            }}
            error={formik?.touched[type] && Boolean(formik?.errors[type])}
            helperText={formik?.touched[type] && formik?.errors[type]}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values[type]}
            sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6C63FF',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6C63FF',
                },
            }}/>
    );
};

const Title = (props) => {
    let firstLine =  "Chào mừng đến với";
    let secondLine = "Nhà Thông Minh";
    if (props.fullname) {
        firstLine = "Trang cá nhân của";
        secondLine = props.fullname;
    }
    
    return (
        <>
            <Typography component="h1" variant="h5">
                {firstLine}
            </Typography>
            <Typography component="h1" variant="h5" sx={{ color: '#6C63FF', fontWeight: 'bold'}}>
                {secondLine}
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
            {props.type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
        </Button>
    )
}

const DirectPage = (props) => {
    const PageMapping = {
        'login': {
            'text': 'Chưa có tài khoản?',
            'link': 'Đăng ký',
            'url': '/register'
        },
        'register': {
            'text': 'Đã có tài khoản?',
            'link': 'Đăng nhập',
            'url': '/login'
        }
    }
    return (
        <Box container sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: 12}}>
                {PageMapping[props.page]['text']} &nbsp;
            </Typography>
            <Typography sx={{fontSize: 12, fontWeight: 'bold'}}>
                <Link href={PageMapping[props.page]['url']} sx={{color: '#6C63FF', textDecoration: 'none'}}>
                    {PageMapping[props.page]['link']}
                </Link>
            </Typography>
        </Box>
    )
}

export {PasswordField,
        SmartHomeImage,
        Field,
        Title,
        AuthButton,
        DirectPage,};