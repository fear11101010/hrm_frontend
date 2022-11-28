import Dropdown from 'react-bootstrap/Dropdown';

function CustomNavbar(props) {
    return (
        <nav className="navbar navbar-vertical fixed-start navbar-expand-md navbar-light" id="sidebar">
            <div className="container-fluid">


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <a className="navbar-brand" href="#">
                    <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..."/>
                </a>


                <div className="navbar-user d-md-none">


                    <div className="dropdown">


                        <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button"
                           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-sm avatar-online">
                                <img src="/img/avatars/profiles/avatar-1.jpg"
                                     className="avatar-img rounded-circle" alt="..."/>
                            </div>
                        </a>


                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarIcon">
                            <a href="#" className="dropdown-item">Profile</a>
                            <a href="#" className="dropdown-item">Settings</a>
                            <hr className="dropdown-divider"/>
                            <a href="#" className="dropdown-item">Logout</a>
                        </div>

                    </div>

                </div>


                <div className="collapse navbar-collapse" id="sidebarCollapse">


                    <form className="mt-4 mb-3 d-md-none">
                        <div className="input-group input-group-rounded input-group-merge input-group-reverse">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                            <div className="input-group-text">
                                <span className="fe fe-search"></span>
                            </div>
                        </div>
                    </form>


                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#sidebarDashboards" data-bs-toggle="collapse"
                               role="button" aria-expanded="true" aria-controls="sidebarDashboards">
                                <i className="fe fe-home"></i> Dashboards
                            </a>
                            <div className="collapse show" id="sidebarDashboards">
                                <ul className="nav nav-sm flex-column">
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
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#sidebarPages" data-bs-toggle="collapse" role="button"
                               aria-expanded="false" aria-controls="sidebarPages">
                                <i className="fe fe-file"></i> Pages
                            </a>
                            <div className="collapse " id="sidebarPages">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="#sidebarAccount" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarAccount">
                                            Account
                                        </a>
                                        <div className="collapse " id="sidebarAccount">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        General
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Billing
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Members
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Security
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Notifications
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarCrm" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarCrm">
                                            CRM
                                        </a>
                                        <div className="collapse " id="sidebarCrm">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Contacts
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Companies
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Deals
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarProfile" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarProfile">
                                            Profile
                                        </a>
                                        <div className="collapse " id="sidebarProfile">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Posts
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Groups
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Projects
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Files
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Subscribers
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarProject" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarProject">
                                            Project
                                        </a>
                                        <div className="collapse " id="sidebarProject">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Overview
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Files
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Reports
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        New project
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarTeam" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarTeam">
                                            Team
                                        </a>
                                        <div className="collapse " id="sidebarTeam">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Overview
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Projects
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Members
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        New team
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarFeed" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarFeed">
                                            Feed
                                        </a>
                                        <div className="collapse " id="sidebarFeed">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Platform
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link ">
                                                        Social
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Wizard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Kanban
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Orders
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Invoice
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Pricing
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">
                                <i className="fe fe-grid"></i> Widgets
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#sidebarAuth" data-bs-toggle="collapse" role="button"
                               aria-expanded="false" aria-controls="sidebarAuth">
                                <i className="fe fe-user"></i> Authentication
                            </a>
                            <div className="collapse" id="sidebarAuth">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="#sidebarSignIn" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarSignIn">
                                            Sign in
                                        </a>
                                        <div className="collapse" id="sidebarSignIn">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Cover
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Illustration
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Basic
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarSignUp" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarSignUp">
                                            Sign up
                                        </a>
                                        <div className="collapse" id="sidebarSignUp">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Cover
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Illustration
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Basic
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarPassword" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarPassword">
                                            Password reset
                                        </a>
                                        <div className="collapse" id="sidebarPassword">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Cover
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Illustration
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Basic
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#sidebarError" className="nav-link" data-bs-toggle="collapse"
                                           role="button" aria-expanded="false" aria-controls="sidebarError">
                                            Error
                                        </a>
                                        <div className="collapse" id="sidebarError">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Illustration
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        Basic
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item d-md-none">
                            <a className="nav-link" data-bs-toggle="offcanvas" href="#sidebarOffcanvasActivity"
                               aria-controls="sidebarOffcanvasActivity">
                                <span className="fe fe-bell"></span> Notifications
                            </a>
                        </li>
                    </ul>


                    <hr className="navbar-divider my-3"/>


                    <h6 className="navbar-heading">
                        Documentation
                    </h6>


                    <ul className="navbar-nav mb-md-4">
                        <li className="nav-item">
                            <a className="nav-link" href="#sidebarBasics" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarBasics">
                                <i className="fe fe-clipboard"></i> Basics
                            </a>
                            <div className="collapse " id="sidebarBasics">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Getting Started
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            Design File
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#sidebarComponents" data-bs-toggle="collapse"
                               role="button" aria-expanded="false" aria-controls="sidebarComponents">
                                <i className="fe fe-book-open"></i> Components
                            </a>
                            <div className="collapse " id="sidebarComponents">
                                <ul className="nav nav-sm flex-column">
                                    <li>
                                        <a href="#" className="nav-link">
                                            Alerts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Autosize
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Avatars
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Badges
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Breadcrumb
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Buttons
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Button group
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Cards
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Charts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Checklist
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Dropdowns
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Forms
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Icons
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Kanban
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Lists
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Map
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Modal
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Navs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Navbar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Page headers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Pagination
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Popovers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Progress
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Social post
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Spinners
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Tables
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Toasts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Tooltips
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Typography
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            Utilities
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">
                                <i className="fe fe-git-branch"></i> Changelog <span
                                className="badge bg-primary ms-auto">v2.1.0</span>
                            </a>
                        </li>
                    </ul>


                    <div className="mt-auto"></div>


                    <div className="mb-4" id="popoverDemo" title="Make Dashkit Your Own!"
                         data-bs-content="Switch the demo to Dark Mode or adjust the navigation layout, icons, and colors!">
                        <a className="btn w-100 btn-primary" data-bs-toggle="offcanvas" href="#offcanvasDemo"
                           aria-controls="offcanvasDemo">
                            <i className="fe fe-sliders me-2"></i> Customize
                        </a>
                    </div>


                    <div className="navbar-user d-none d-md-flex" id="sidebarUser">


                        <a className="navbar-user-link" data-bs-toggle="offcanvas"
                           href="#sidebarOffcanvasActivity" aria-controls="sidebarOffcanvasActivity">
                <span className="icon">
                  <i className="fe fe-bell"></i>
                </span>
                        </a>

                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="sidebarIconCopy" role="button">
                                <div className="avatar avatar-sm avatar-online">
                                    <img src="/img/avatars/profiles/avatar-1.jpg"
                                         className="avatar-img rounded-circle" alt="..."/>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu flip={true}>
                                <Dropdown.Item href="#" as="a">Profile</Dropdown.Item>
                                <Dropdown.Item href="#" as="a">Settings</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item href="#" as="a">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/*<div className="dropup">


                            <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button"
                               data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="avatar avatar-sm avatar-online">
                                    <img src="/img/avatars/profiles/avatar-1.jpg"
                                         className="avatar-img rounded-circle" alt="..."/>
                                </div>
                            </a>


                            <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                                <a href="#" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Settings</a>
                                <hr className="dropdown-divider"/>
                                <a href="#" className="dropdown-item">Logout</a>
                            </div>

                        </div>*/}


                        <a className="navbar-user-link" data-bs-toggle="offcanvas"
                           href="#sidebarOffcanvasSearch" aria-controls="sidebarOffcanvasSearch">
                <span className="icon">
                  <i className="fe fe-search"></i>
                </span>
                        </a>

                    </div>

                </div>


            </div>
        </nav>
    )
}

export default CustomNavbar