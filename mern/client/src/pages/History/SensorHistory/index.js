import React from "react";
import { Container, Row, Breadcrumb, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./sensorhistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item >
            <Link to="/history">History</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/history/room">Phòng khách</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Cảm biến</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <div className="datepicker d-flex align-items-center m-3">
          <Form.Control type="date" name="start_date" class="btn" style={{width: '10rem'}}/>
          <span className={styles.dash}>-</span>
          <Form.Control type="date" name="end_date" class="btn" style={{width: '10rem'}}/>
          <Button variant="info" className="ms-3">
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        </div>
      </Row>
      <Row>
        <Table striped bordered hover className="ms-4">
          <thead>
            <tr>
              <th style={{width: '44rem'}}>Thời gian</th>
              <th style={{width: '22rem'}}>Thông số</th>
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