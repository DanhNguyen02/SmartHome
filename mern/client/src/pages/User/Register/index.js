import React, { useState } from 'react';
import {Button,
        TextField,
        Grid,
        Box,
        Typography,
        InputAdornment,
        IconButton,
        Link,
        Checkbox,
        CssBaseline,
        Container,
        FormControlLabel,}
    from '@mui/material';
import {createTheme,
        ThemeProvider,}
    from '@mui/material/styles';
import {EmailOutlined,
        VpnKeyOutlined,
        Visibility,
        VisibilityOff,}
    from '@material-ui/icons';

import pic from '../../../assets/images/login-register.png';

const theme = createTheme();

export default function Register() {
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
        <Grid container spacing={2}
              sx={{
                  alignItems: 'center',
                  px: 16,
                  pt: 4,
              }}>
            <Grid lg={6}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <img
                        alt="Smart home"
                        src={pic}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Grid>
            <Grid lg={6}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                mt: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Welcome to
                            </Typography>
                            <Typography component="h1" variant="h5"
                                        sx={{
                                            color: '#6C63FF',
                                            fontWeight: 'bold',
                                        }}
                            >
                                Smart Home
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
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
                                    }}
                                />
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
                                    }}
                                />
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label={
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' , fontSize: 14}}>
                                            I have read and agree to the <Link href="#" underline="always" sx={{ color: '#6C63FF' }}>terms and conditions</Link>
                                            </Typography>
                                        }
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx = {{
                                        mt: 3,
                                        p: 2,
                                        backgroundColor: '#6C63FF',
                                        fontSize: 12
                                    }}
                                >
                                    Login
                                </Button>
                                <Box container sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                                    <Typography component="h1" sx={{fontSize: 12}}>
                                        Already have account?&nbsp;
                                    </Typography>
                                    <Link href="/login" sx={{color: '#6C63FF', fontSize: 12}}>
                                        Login
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid>
    )
}