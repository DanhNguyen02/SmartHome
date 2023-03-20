import React from 'react';
import {Grid,
        Box,
        Link,
        Checkbox,
        Container,
        FormControlLabel,}
    from '@mui/material';

import {PasswordField,
        SmartHomeImage,
        Field,
        AuthButton,
        Title,
        DirectPage,}
    from '../components';

const AltOption = () => {
    return (
        <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Ghi nhớ"
                    sx={{ '& .MuiFormControlLabel-label': { fontWeight: 'bold', fontSize: 14 }, textAlign: 'left' }}/>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="#" sx={{ color: '#6C63FF', fontSize: 14 }}>
                    Quên mật khẩu?
                </Link>
            </Grid>
        </Grid>
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
        <Grid container spacing={2}
              sx={{
                  alignItems: 'center',
                  px: 16,
                  pt: 4,
              }}>
            <Grid sm={6}>
                <SmartHomeImage/>
            </Grid>
            <Grid sm={6}>
                <Container component="main" maxWidth="xs">
                    <Box sx={{
                            mt: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Title/>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Field type='email' label='Địa chỉ Email'/>
                            <PasswordField type='password' label='Mật khẩu'/>
                            <AltOption/>
                            <AuthButton type='login'/>
                            <DirectPage page='login'/>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}