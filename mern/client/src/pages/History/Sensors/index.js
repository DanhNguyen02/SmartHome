import React from "react";
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./sensors.module.css";
import Logo from "../../.././assets/images/logo.png";

function ListSensors() {
  let listRooms = [];
  for (let i = 0; i < 6; i++) {
    listRooms.push(<Sensor />)
  }
  return listRooms;
}

function Sensor() {
  return (
    <Col lg="3">
      <Link to='/history/room/sensor'>
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={Logo}/>
          <Card.Body>
            <Card.Title>Cảm biến</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

function Sensors() {
  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item >
            <Link className={styles.link} to="/history">History</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Phòng khách</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <ListSensors />
      </Row>
    </Container>
  );
}
export default Sensors;