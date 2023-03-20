import React from "react";
import {
  Typography,
  Button,
  Breadcrumbs,
  Grid,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DownloadIcon from '@mui/icons-material/Download';
import rooms from '../../assets/data/rooms.json'

function ListRooms() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listRooms}
      sx={{ width: 200}}
      renderInput={(params) => <TextField {...params} label="Chọn phòng" />}
    />
  );
}

const listRooms = rooms.map((room) => room.name);

function ListSensors() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listSensors}
      sx={{ width: 200}}
      renderInput={(params) => <TextField {...params} label="Chọn cảm biến" />}
    />
  );
}

const listSensors = [
  "Nhiệt độ",
  "Độ ẩm",
  "Ánh sáng"
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const records = [
  {
    id: 1,
    time: '11/03/2023 12:00:00',
    record: 30
  },
  {
    id: 2,
    time: '11/03/2023 12:00:00',
    record: 25
  },
  {
    id: 3,
    time: '11/03/2023 12:00:00',
    record: 27
  },
  {
    id: 4,
    time: '11/03/2023 12:00:00',
    record: 28
  },
  {
    id: 5,
    time: '11/03/2023 12:00:00',
    record: 30
  },
  {
    id: 6,
    time: '11/03/2023 12:00:00',
    record: 31
  },
  {
    id: 7,
    time: '11/03/2023 12:00:00',
    record: 35
  },
  {
    id: 8,
    time: '11/03/2023 12:00:00',
    record: 32
  },
  {
    id: 9,
    time: '11/03/2023 12:00:00',
    record: 31
  },
  {
    id: 10,
    time: '11/03/2023 12:00:00',
    record: 33
  },
  {
    id: 11,
    time: '11/03/2023 12:00:00',
    record: 32
  },
  {
    id: 12,
    time: '11/03/2023 12:00:00',
    record: 30
  }
]

function ChooseSensor() {
  return (
    <>
      <Grid container className="px-3 py-1">
        <Grid item>
          <ListRooms />
        </Grid>
        <Grid sx={{marginLeft: '21px'}}>
          <ListSensors />
        </Grid>
        <Grid >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{ width: 200, marginLeft: 5}}/>
          </LocalizationProvider>
        </Grid>
        <Grid sx={{marginLeft: '21px'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{ width: 200}}/>
          </LocalizationProvider>
        </Grid>
        <Grid>
          <Button variant="contained" size="large" sx={{height: 55, marginLeft: '20px'}}>
            <DownloadIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

function Graph() {
  return (
    <Box sx={{width: "95%", height: "400px", marginTop: 5}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={700}
          height={800}
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="record" stroke="#5A6ACF" name="Dữ liệu" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

function RecordTable() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width:'100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Thời gian</StyledTableCell>
              <StyledTableCell>Thông số</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <StyledTableRow key={record.id}>
                <StyledTableCell component="th" scope="row">
                  {record.time}
                </StyledTableCell>
                <StyledTableCell>{record.record}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function History() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '20px' }}>
        <Typography color="text.primary">Lịch sử cảm biến</Typography>
      </Breadcrumbs>
      <ChooseSensor />
      <Graph />
      <RecordTable />
    </>
  );
}
export default History;