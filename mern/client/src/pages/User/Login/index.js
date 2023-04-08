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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AltOption = () => {
    return (
        <Grid container sx={{alignItems: 'center'}}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" sx={{'& .MuiSvgIcon-root': {color: '#6C63FF'}}}/>}
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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Email không hợp lệ')
                .required('Email không được để trống'),
            password: Yup
                .string()
                .min(6, 'Mật khẩu phải tối thiểu 6 ký tự')
                .required('Mật khẩu không được để trống'),
        }),
        onSubmit: async (values) => {
            try {
              const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
              });
      
              console.log(response.data);
              // Thực hiện chuyển hướng đến trang đăng nhập
            } catch (error) {
              console.error(error);
              // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
            }
        },
    });
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
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Field type='email' label='Địa chỉ Email' formik={formik}/>
                            <PasswordField type='password' label='Mật khẩu' formik={formik}/>
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