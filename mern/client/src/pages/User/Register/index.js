import React from 'react';
import {Grid,
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
        Field,
        AuthButton,
        Title,
        DirectPage,}
    from '../components';

const theme = createTheme();

const PolicyCheckbox = () => {
    return (
        <Grid container sx={{ alignItems: 'center'}}>
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
                <Typography variant="body1" sx={{ fontWeight: 'bold' , fontSize: 14}}>
                I have read and agree to the <Link href="#" underline="always" sx={{ color: '#6C63FF' }}>terms and conditions</Link>
                </Typography>
            }/>
        </Grid>
    )
}

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
                            }}>
                            <Title/>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <Field type='email' label='Email'/>
                                <PasswordField type='password' label='Password'/>
                                <PasswordField type='confirm-password' label='Confirm password'/>
                                <PolicyCheckbox/>
                                <AuthButton label='Register'/>
                                <DirectPage page='register'/>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid>
    )
}