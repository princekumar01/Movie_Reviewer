import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink} from 'react-router-dom';
import { Button } from '@mui/material';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color": "gold"}}>
             <FontAwesomeIcon icon={faVideoSlash}/>Gold
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                </Nav>
                <Button   style={{border: '1px solid gold','border-radius': '10px',overflow: 'hidden',color: "#03fcf4",padding:'0.2em',margin:'0.1em'}}  ><NavLink to="/login" style={{color: "#03fcf4"}}>Login</NavLink></Button>
                <Button   style={{border: '1px solid gold','border-radius': '10px',overflow: 'hidden',color: "#03fcf4",padding:'0.3em',margin:'0.1em'}}><NavLink to="/register" style={{color: "#03fcf4"}}>Register</NavLink></Button> 
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
};

export default Navigation
