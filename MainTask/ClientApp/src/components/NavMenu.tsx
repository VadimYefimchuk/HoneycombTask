import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useHistory } from "react-router-dom";
import {setLogout} from './Services/AuthorizationQuery'


export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    authData = JSON.parse(localStorage.getItem('login') || '{}');

    roleIsUndefined = <div style={{display: "flex"}}>
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/login">Login</NavLink>
                        </NavItem>
                        
                        <NavItem>
                            <NavLink tag={Link} className="text-white" to="/register">Registration</NavLink>
                        </NavItem>
                    </div>;

    adminMenu = <NavItem>
                    <NavLink tag={Link} className="text-white" to="/admin">Admin's table</NavLink>
                </NavItem>;
                        

    public render() {
        var checkRole = this.authData.role == "Admin";
        var checkLogin = this.authData.login;

        return (
            <header style={{backgroundColor: "#140203"}}>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} className="text-white" to="/login"><strong>MainTask</strong></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {
                                    checkLogin
                                    ?
                                        <div style={{display: "flex", fontWeight:"bolder"}}>
                                            {checkRole ? this.adminMenu : <div></div> }       

                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/select">Select Date</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/profile">Profile</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink tag={Link} className="text-white" to="/courses">Courses</NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink className="text-white" onClick={()=>{setLogout()}}>Logout </NavLink>
                                            </NavItem>
                                        </div>
                                        
                                    : this.roleIsUndefined
                                        
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
