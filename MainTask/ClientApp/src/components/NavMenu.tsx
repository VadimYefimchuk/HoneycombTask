import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useHistory } from "react-router-dom";


export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    authData = JSON.parse(localStorage.getItem('login') || '{}');
    setLogout() {
        localStorage.setItem('login', JSON.stringify({
            login: null,
            token: null,
            role: null,
            uName: null,
        }));
        localStorage.setItem('userData', JSON.stringify({
            id: null,
            email: null,
            userName: null,
            name: null,
            lastName: null,
            age: null,
            registeredDate: null,
            studyDate: null
        }));
        window.location.reload();
    }

    public render() {
        var checkRole = this.authData.role == "Admin";
        var checkLogin = this.authData.login;

        return (
            <header style={{backgroundColor: "#140203"}}>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} className="text-white" to="/login">MainTask</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {
                                    checkLogin
                                    ?
                                        <div style={{display: "flex", fontWeight:"bolder"}}>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/admin">Admin's table</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/select">Select Date</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/profile">Profile</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink className="text-white" onClick={()=>{this.setLogout()}}>Logout </NavLink>
                                            </NavItem>
                                        </div>
                                    :
                                        <div style={{display: "flex"}}>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/login">Login</NavLink>
                                            </NavItem>
                                            
                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/register">Registration</NavLink>
                                            </NavItem>
                                        </div>
                                }
  
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
