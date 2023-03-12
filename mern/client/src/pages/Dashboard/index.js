import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Box,
  Paper,
  Grid,
  Switch,
} from "@mui/material";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import LightIcon from "../../assets/images/lightIcon.png";
import FanIcon from "../../assets/images/fanIcon.png";
import SensorIcon from "../../assets/images/sensorIcon.png";

const MARGIN_LEFT = "20px";
const ROOM = "Master Bedroom";
const TEMP = "26";
const HUMI = "68";
const today = new Date().toLocaleDateString();
var timewithsec = new Date().toLocaleTimeString();
const time = timewithsec.substring(0, timewithsec.length - 6);
const DATA = [
  {
    time: "00h00",
    temperature: 21,
    humidity: 64,
  },
  {
    time: "01h00",
    temperature: 23,
    humidity: 61,
  },
  {
    time: "02h00",
    temperature: 24,
    humidity: 65,
  },
  {
    time: "03h00",
    temperature: 20,
    humidity: 67,
  },
  {
    time: "04h00",
    temperature: 24,
    humidity: 70,
  },
  {
    time: "05h00",
    temperature: 25,
    humidity: 64,
  },
  {
    time: "06h00",
    temperature: 26,
    humidity: 72,
  },
];

const LIGHT = [
  {
    name: "Ceiling Light 1",
    toggle: false,
    brightness: 0,
  },
  {
    name: "Ceiling Light 2",
    toggle: false,
    brightness: 0,
  },
  {
    name: "Toilet Room Light",
    toggle: false,
    brightness: 0,
  },
  {
    name: "Sleeping Light ",
    toggle: false,
    brightness: 0,
  },
];

const FAN = [
  {
    name: "Fan 1",
    toggle: false,
  },
  {
    name: "Fan 2",
    toggle: false,
  },
];

const SENSOR = [
  {
    name: "Room Temperature",
    toggle: false,
  },
  {
    name: "Room Humidity",
    toggle: false,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: MARGIN_LEFT }}>
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Typography color="text.primary">{ROOM}</Typography>
      </Breadcrumbs>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ minHeight: "350px" }}>
              <Box sx={{ position: "relative" }}>
                <p>Data Chart</p>
                <h5>{ROOM}</h5>
                <Button
                  variant="outlined"
                  sx={{ position: "absolute", top: "0", right: "0" }}
                >
                  Detail
                </Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                }}
              >
                <p>{today}</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={DATA}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8884d8"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="humidity"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <Box></Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ minHeight: "350px" }}>
              <h5>
                {time} {today}
              </h5>
              <Box
                sx={{
                  backgroundColor: "#C8CBD9",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginTop: "40px",
                  width: "70%",
                }}
              >
                <p>Temperature</p>
                <Box
                  sx={{
                    fontSize: "35px",
                    fontWeight: "medium",
                    textAlign: "center",
                  }}
                >
                  {TEMP}°C
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#E6E8EC",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginTop: "10px",
                  width: "70%",
                }}
              >
                <p>Humidity</p>
                <Box
                  sx={{
                    fontSize: "35px",
                    fontWeight: "medium",
                    textAlign: "center",
                  }}
                >
                  {HUMI}%
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ marginLeft: MARGIN_LEFT, display: "flex" }}>
              <h6>Devices and Sensors</h6>
              <Box sx={{ marginLeft: "40px" }}>
                <FontAwesomeIcon icon={faGear} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <p>Lights</p>
              {LIGHT.map((light) => (
                <Box key={light.name}>
                  <Box
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      position: "relative",
                      borderBottom: "1px solid #DBE5EB",
                    }}
                  >
                    <img
                      src={LightIcon}
                      alt=""
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                      }}
                    />
                    <p style={{ marginTop: "4px" }}>{light.name}</p>
                    <Switch sx={{ position: "absolute", right: "0" }} />
                  </Box>
                </Box>
              ))}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Air conditioners and Fans</p>
              {FAN.map((fan) => (
                <Box key={fan.name}>
                  <Box
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      position: "relative",
                      borderBottom: "1px solid #DBE5EB",
                    }}
                  >
                    <img
                      src={FanIcon}
                      alt=""
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                      }}
                    />
                    <p style={{ marginTop: "4px" }}>{fan.name}</p>
                    <Switch sx={{ position: "absolute", right: "0" }} />
                  </Box>
                </Box>
              ))}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Sensors</p>
              {SENSOR.map((sensor) => (
                <Box key={sensor.name}>
                  <Box
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      position: "relative",
                      borderBottom: "1px solid #DBE5EB",
                    }}
                  >
                    <img
                      src={SensorIcon}
                      alt=""
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "180%",
                        marginRight: "10px",
                        boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                      }}
                    />
                    <p style={{ marginTop: "4px" }}>{sensor.name}</p>
                    <Switch sx={{ position: "absolute", right: "0" }} />
                  </Box>
                </Box>
              ))}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Dashboard;
