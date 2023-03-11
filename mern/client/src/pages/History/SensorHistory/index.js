import React, { useState } from "react";
import { Container, Row, Breadcrumb, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import styles from "./sensorhistory.module.css";

const records = [
  {
    time: '2023-03-11T12:00:00',
    record: 30
  },
  {
    time: '2023-03-11T12:00:00',
    record: 30
  },
  {
    time: '2023-03-11T12:00:00',
    record: 30
  },
  {
    time: '2023-03-11T12:00:00',
    record: 30
  },
  {
    time: '2023-03-11T12:00:00',
    record: 30
  },
  {
    time: '2023-03-11T12:00:00',
    record: 30
  }
]

function ListRecords() {
  return records.map(record => (
    <tr>
      <td>{record.time}</td>
      <td>{record.record}</td>
    </tr>
  ))
}

function SensorHistory() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container className={styles.main}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item >
            <Link to="/history">History</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/history/room">Phòng khách</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Nhiệt độ 1</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Thông số</th>
            </tr>
          </thead>
          <tbody>
            <ListRecords />
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
export default SensorHistory;