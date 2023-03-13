import React, { useState } from "react";
import {
  Button,
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
  FormControlLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  EmailOutlined,
  VpnKeyOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

import pic from "../../../assets/images/login-register.png";

const theme = createTheme();

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
        px: 16,
        pt: 4,
      }}
    >
      <Grid lg={6}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <img
            alt="Smart home"
            src={pic}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Welcome to
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: "#6C63FF",
                  fontWeight: "bold",
                }}
              >
                Smart Home
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
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
                  type={showPassword ? "text" : "password"}
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
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontWeight: "bold",
                          fontSize: 14,
                        },
                        textAlign: "left",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Link href="#" sx={{ color: "#6C63FF", fontSize: 14 }}>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "#6C63FF",
                    fontSize: 12,
                  }}
                  href="/dashboard"
                >
                  Login
                </Button>
                <Box
                  container
                  sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                >
                  <Typography component="h1" sx={{ fontSize: 12 }}>
                    Don't have an account?&nbsp;
                  </Typography>
                  <Link
                    href="/register"
                    sx={{ color: "#6C63FF", fontSize: 12 }}
                  >
                    Register
                  </Link>
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
