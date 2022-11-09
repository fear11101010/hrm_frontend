import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Collapse} from "react-bootstrap";
import {useState} from "react";

function Navbar1(props){
    const [menuOpenCloseState,setMenuOpenCloseState] = useState([false])
    const openOrCloseMenu = (i)=>{
        // console.log(e);
        const menus = [...menuOpenCloseState];
        const currentMenuState = menuOpenCloseState[i];
        menus.fill(false);
        menus[i] = !currentMenuState
        setMenuOpenCloseState(menus);
    }
    return (
        <Navbar expand="md" fixed="top" variant="light" className="navbar-vertical">
            <Container fluid>
                <Navbar.Toggle aria-controls="sidebarCollapse"/>
                <Navbar.Brand href="#">
                    <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..."/>
                </Navbar.Brand>
                <Navbar.Collapse id="sidebarCollapse">
                    <Form className="mt-4 mb-3 d-md-none">
                        <InputGroup className="input-group-rounded input-group-merge input-group-reverse">
                            <FormControl type="search" placeholder="Search"/>
                            <InputGroup.Text>
                                <span className="fe fe-search"></span>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                    <Nav as="ul">
                        <Nav.Item as={"li"}>
                            <Nav.Link onClick={()=>openOrCloseMenu(0)} href="#" className={menuOpenCloseState[0]?'collapsed':''}  data-bs-toggle="collapse" role="button" aria-expanded={menuOpenCloseState[0]?"true":"false"} aria-controls="sidebarDashboards">
                                <i className="fe fe-home"></i> Dashboards
                            </Nav.Link>
                            <Collapse in={menuOpenCloseState[0]}>
                                <div id="sidebarDashboards">
                                    <ul  className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link active">
                                                Default
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link ">
                                                Project Management
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link ">
                                                E-Commerce
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navbar1