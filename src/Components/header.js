import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ userCount, handleRefreshClick }) {
  return (
    <>
      <div style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Userpedia</Navbar.Brand>
            <Nav className="me-auto">
              <span className="mx-auto" style={{ fontWeight: 'bold', color: "white" }}>
                No. of users: {userCount}
              </span>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button
                  variant="outline-light"
                  onClick={handleRefreshClick}
                >REFRESH
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
