import PropTypes from "prop-types";

function Header({title,preTitle}) {
    return (
        <div className="header">
            <div className="container-fluid">


                <div className="header-body">
                    <div className="row align-items-end">
                        <div className="col">


                            {preTitle && (<h6 className="header-pretitle">
                                {preTitle}
                            </h6>)}


                            <h1 className="header-title">
                                {title}
                            </h1>

                        </div>
                        <div className="col-auto">


                            <a href="#" className="btn btn-primary lift">
                                Create Report
                            </a>

                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}
/*Header.propTypes = {
    title:PropTypes.string.isRequired,
    preTitle:PropTypes.string
}*/
export default Header;