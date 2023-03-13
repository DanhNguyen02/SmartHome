import React from 'react';
import {Button,
        Grid,
        Box,
        Typography,
        Link,
        Checkbox,
        CssBaseline,
        Container,
        FormControlLabel,}
    from '@mui/material';
import {createTheme,
        ThemeProvider,}
    from '@mui/material/styles';

import {PasswordField,
        SmartHomeImage,
        Field,}
    from '../components';

const theme = createTheme();

export default function Register() {
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
                <SmartHomeImage/>
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
                                        }}>
                                Smart Home
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <Field type='email' label='Email'/>
                                <PasswordField type='password' label='Password'/>
                                <PasswordField type='confirm-password' label='Confirm password'/>
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
                                        fontSize: 12,
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            color: '#6C63FF',
                                        },
                                    }}>
                                    Register
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