import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { Divider } from '@material-ui/core';
import axios from 'axios';


const Username = "Hung Nguyen";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F6F6FB",
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [notifications, setNotifications] = React.useState([]);
  const [badgeCount, setBadgeCount] = React.useState(0);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/noti')
      .then(response => {
        setNotifications(response.data.reverse());
        setBadgeCount(response.data.length);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(notifications)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [showNoti, setShowNoti] = React.useState(null);

  const handleClick = (event) => {
    setShowNoti(event.currentTarget);
  };
  const handleClose = () => {
    setShowNoti(null);
  };

  const open = Boolean(showNoti);
  const id = open ? 'notification-popover' : undefined;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Thông tin cá nhân
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Tài khoản của tôi</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Thông tin cá nhân</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Thông báo</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "#fff", color: "#37375C" }}
      >
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <p style={{ marginTop: "15px" }}>Xin chào, {Username}</p>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={badgeCount} color="error" onClick={handleClick}>
              <NotificationsIcon />
              </Badge>
              <Menu
                id={id}
                anchorEl={showNoti}
                open={Boolean(showNoti)}
                onClose={handleClose}>
                  {notifications.map((notification, index) => (
                    <>
                      {index !== 0 && <Box sx={{
                        height: '2px',
                        borderTop: '2px solid #6C63FF',
                        borderColor: '#6C63FF',
                        my: 2,
                      }} />}
                      <MenuItem sx={{
                        fontSize: 13,
                        width: '320px',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        borderRadius: '10px',
                        m: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                        <span>
                          Thiết bị vượt ngưỡng cho phép:
                          <span style={{fontWeight: 'bold', color: '#6C63FF'}}> {notification.device} - </span>
                          <span style={{fontWeight: 'bold', color: '#6C63FF'}}> {notification.room}</span>
                        </span>
                        <span>Thông số:
                          <span style={{fontWeight: 'bold', color: '#6C63FF'}}> {notification.data}</span>
                        </span>
                        <span>Thời gian:
                          <span style={{fontWeight: 'bold', color: '#6C63FF'}}> {notification.time}</span>
                        </span>
                      </MenuItem>
                    </>
                  ))}
              </Menu>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}