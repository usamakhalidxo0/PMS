import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import UserTag from './UserTag';
import {Link} from 'react-router-dom';

function MyNavbar(){
    return (
        <Navbar bg="light" expand="lg">
            <Link className="navbar-brand" to="/">iTiles</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link className="nav-link" to="/home">Home</Link>
                </Nav>
                <UserTag/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;