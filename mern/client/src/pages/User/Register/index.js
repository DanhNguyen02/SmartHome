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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirm-password'),
        });

        console.log(response.data);
        // Thực hiện chuyển hướng đến trang đăng nhập
    } catch (error) {
        console.error(error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
};


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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            policy: false
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
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu phải trùng khớp')
                .required('Xác nhận mật khẩu không được để trống'),
            policy: Yup
                .boolean()
                .oneOf([true], 'You must accept the terms and conditions')
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
              const response = await axios.post('http://localhost:5000/api/auth/register', {
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
                            <Field type="email" label="Địa chỉ email" formik={formik}/>
                            <PasswordField type='password' label='Mật khẩu' formik={formik}/>
                            <PasswordField type='confirmPassword' label='Xác nhận mật khẩu' formik={formik}/>
                            <PolicyCheckbox/>
                            <AuthButton type='register'/>
                            <DirectPage page='register'/>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}