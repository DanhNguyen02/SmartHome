import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import Logo from "../../.././assets/images/logo.png";

function ListRooms() {
  let listRooms = [];
  for (let i = 0; i < 6; i++) {
    listRooms.push(<Room />);
  }
  return listRooms;
}

function Room() {
  return (
    <Col lg="3">
      <Link to="/history/room">
        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src={Logo} />
          <Card.Body>
            <Card.Title>Phòng khách</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

function Rooms() {
  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item active>History</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <ListRooms />
      </Row>
    </Container>
  );
}
export default Rooms;
