import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
  Slider,
  Autocomplete,
  TextField,
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
const today = new Date().toLocaleDateString();
var timewithsec = new Date().toLocaleTimeString();
const time = timewithsec.substring(0, timewithsec.length - 6);
let room = 1;
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [lightValue, setLightValue] = useState(false);
  const [fanVolume, setFanVolume] = useState([]);
  const [TEMP, setTemp] = useState([]);
  const [HUMI, setHumi] = useState([]);
  const [theRoom, setRoom] = useState(null);
  const [nameRoom, setNameRoom] = useState(null);
  useEffect(function effectFunction() {
    fetch(`http://localhost:5000/api/light/` + "?room=" + room)
      .then((response) => response.json())
      .then(({ message: light }) => {
        setLightValue(light == 1 ? true : false);
      });
    fetch(`http://localhost:5000/api/fan/` + "?room=" + room)
      .then((response) => response.json())
      .then(({ message: fan }) => {
        setFanVolume(parseInt(fan));
      });
    fetch(`http://localhost:5000/api/temp/` + "?room=" + room)
      .then((response) => response.json())
      .then(({ message: temp }) => {
        setTemp(temp);
      });
    fetch(`http://localhost:5000/api/humi/` + "?room=" + room)
      .then((response) => response.json())
      .then(({ message: humi }) => {
        setHumi(humi);
      });
  }, []);

  const [listRooms, setListRooms] = useState([]);

  // Fetch list rooms
  useEffect(() => {
    fetchListRooms();
  }, []);

  async function fetchListRooms() {
    const response = await fetch("http://localhost:5000/api/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    setListRooms(record);
  }

  async function onChangeLight(e) {
    e.preventDefault();
    setLightValue(!lightValue);
    let data = lightValue === true ? "0" : "1";
    console.log(data);
    let newData = {
      topic: "haiche198/feeds/yolo-led",
      data: data,
    };
    await fetch("http://localhost:5000/api/light/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  const timerRef = useRef();

  async function expensiveCallback(value) {
    setFanVolume(value); // <-- finally update state, or anything else really
    console.log("expensiveCallback", value);
    let newData = {
      topic: "haiche198/feeds/yolo-fan",
      data: String(value),
    };
    await fetch("http://localhost:5000/api/fan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  async function handleFanChange(e) {
    const { value } = e.target;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      expensiveCallback(value); // <-- re-enclose latest value
    }, 250); // <-- tune this value to what feels best for you
  }

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      const sec = new Date().getSeconds();
      if (sec % 6) return;
      fetchTemp();
      fetchHumi();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  async function fetchTemp() {
    const response = await fetch(
      `http://localhost:5000/api/temp/` + "?room=" + room
    );

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    setTemp(record.message);
  }

  async function fetchHumi() {
    const response = await fetch(
      `http://localhost:5000/api/humi/` + "?room=" + room
    );

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    setHumi(record.message);
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: MARGIN_LEFT }}>
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        {/* <Typography color="text.primary">{ROOM}</Typography> */}
        <Autocomplete
          disablePortal
          id="listrooms"
          value={nameRoom}
          onChange={(event, nameRoom) => {
            for (let room of listRooms) {
              if (room.name === nameRoom) {
                setRoom(listRooms.indexOf(room));
              }
            }
            setNameRoom(nameRoom);
          }}
          options={listRooms.map((room) => room.name)}
          sx={{ width: 160 }}
          renderInput={(params) => <TextField {...params} label="Chọn phòng" />}
        />
      </Breadcrumbs>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ minHeight: "350px" }}>
              <Box sx={{ position: "relative" }}>
                <p>Biểu đồ dữ liệu</p>
                <h5>{theRoom == null ? theRoom : listRooms[theRoom].name}</h5>
                <Link href="/history">
                  <Button
                    variant="outlined"
                    sx={{ position: "absolute", top: "0", right: "0" }}
                  >
                    Chi tiết
                  </Button>
                </Link>
              </Box>
              {theRoom != null ? (
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
                        name="Nhiệt độ"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="humidity"
                        stroke="#82ca9d"
                        name="Độ ẩm"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <></>
              )}
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
                <p>Nhiệt độ</p>
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
                <p>Độ ẩm</p>
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
              <h6>Thiết bị và Cảm biến</h6>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <p>Đèn</p>
              {theRoom != null ? (
                listRooms[theRoom].devices
                  .filter((device) => device.type == "light")
                  .map((light) => (
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
                        <Switch
                          checked={lightValue}
                          sx={{ position: "absolute", right: "0" }}
                          onChange={(e) => {
                            onChangeLight(e);
                          }}
                        />
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Máy lạnh và quạt</p>
              {theRoom != null ? (
                listRooms[theRoom].devices
                  .filter((device) => device.type == "fan")
                  .map((fan) => (
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
                        {/* <Switch sx={{ position: "absolute", right: "0" }} /> */}
                        <Slider
                          aria-label="Temperature"
                          value={fanVolume}
                          valueLabelDisplay="auto"
                          step={25}
                          marks
                          min={0}
                          max={100}
                          sx={{
                            position: "absolute",
                            right: "0",
                            width: "60%",
                          }}
                          onChange={handleFanChange}
                        />
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Cảm biến</p>
              {theRoom != null ? (
                listRooms[theRoom].devices
                  .filter(
                    (device) => device.type == "temp" || device.type == "humi"
                  )
                  .map((sensor) => (
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
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Dashboard;
