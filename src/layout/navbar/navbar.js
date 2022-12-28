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





            </div>
        </nav>
    )
}

export default CustomNavbar