import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {Collapse} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState} from "react";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link} from "react-router-dom";

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
        <Navbar expand="md" variant="light" className="navbar-vertical fixed-start">
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
                            <Nav.Link href="/" className={menuOpenCloseState[0]?'collapsed':''}  >
                                <i className="fe fe-home"></i> Dashboard
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as={"li"}>
                            <Nav.Link onClick={()=>openOrCloseMenu(0)} href="#" className={menuOpenCloseState[0]?'collapsed':''}  data-bs-toggle="collapse" role="button" aria-expanded={menuOpenCloseState[0]?"true":"false"} aria-controls="sidebarKPI">
                                <i className="fe">
                                    <FontAwesomeIcon icon={solid("plug")}/>
                                </i> Kpi
                            </Nav.Link>
                            <Collapse in={menuOpenCloseState[0]}>
                                <div id="sidebarKPI">
                                    <ul  className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/kpi/kpi_form" className="nav-link">Kpi Performance Form</Link>
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