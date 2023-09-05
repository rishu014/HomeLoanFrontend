import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserSidebar from './UserSidebar'


const UserAboutUs = () => {
  return (
    <Container fluid className='p-0'>
      <Row className="flex-nowrap m-0 p-0">
     <UserSidebar/>
      <Col className="col py-3">
        <h3>About Us</h3>
       
      </Col>
    </Row>
  </Container>
  )
}

export default UserAboutUs
