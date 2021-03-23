import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'

export default class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <Navbar bg="danger" variant="dark">
                    <Navbar.Brand as={Link} to="/">Kyummy ADMIN</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Pending Reservation</Nav.Link>
                            <Nav.Link as={Link} to="/ready">Ready to pick up</Nav.Link>
                            <Nav.Link as={Link} to="/receive">Received</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                            Signed in as: ADMIN
                            </Navbar.Text>
                        </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
