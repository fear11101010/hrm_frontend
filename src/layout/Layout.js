import Navbar1 from "./navbar/navbar1";
import {Outlet} from 'react-router-dom';
import Header from "./header/Header";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";

function Layout(props) {
    const [header,setHeader] = useState({})

    return (
        <div>
            <Navbar1/>
            <div className="main-content">
                <Header title={header.title} preTitle={header?.preTitle}/>
                <Container fluid>
                    <Outlet context={{setHeader}}/>
                </Container>
            </div>
        </div>
    );
}
export default Layout;