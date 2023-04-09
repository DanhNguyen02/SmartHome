import React from 'react';
import {Grid,
        Box,
        Typography,
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

const PolicyCheckbox = () => {
    return (
        <Grid container sx={{ alignItems: 'center'}}>
            <FormControlLabel
            control={<Checkbox value="remember" sx={{'& .MuiSvgIcon-root': {color: '#6C63FF'}}}/>}
            label={
                <Typography variant="body1" sx={{ fontWeight: 'bold' , fontSize: 14}}>
                Tôi đã đọc và đồng ý với <Link href="#" underline="always" sx={{ color: '#6C63FF' }}>điều khoản và điều kiện</Link>
                </Typography>
            }/>
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
            <Grid lg={6}>
                <SmartHomeImage/>
            </Grid>
            <Grid lg={6}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            mt: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Title/>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Field type='email' label='Địa chỉ email'/>
                            <PasswordField type='password' label='Mật khẩu'/>
                            <PasswordField type='confirm-password' label='Xác nhận mật khẩu'/>
                            <PolicyCheckbox/>
                            <AuthButton label='Đăng ký'/>
                            <DirectPage page='register'/>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}