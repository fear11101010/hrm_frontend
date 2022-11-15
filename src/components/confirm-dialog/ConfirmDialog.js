import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import PropTypes from "prop-types";

function ConfirmDialog({message, onOkButtonClick, onCancelButtonClick}) {
    const [openDialog, setOpenDialog] = useState(true);
    const okButtonClick = (e) => {
        if (onOkButtonClick) {
            onOkButtonClick()
        }
        setOpenDialog(false)
    };
    const cancelButtonClick = (e) => {
        if (onCancelButtonClick) {
            onCancelButtonClick()
        }
        setOpenDialog(false)
    }
    return (
        <Modal show={openDialog} size="md" centered backdrop="static">
            <Modal.Body className="m-auto">
                <h2 className="mb-3 text-center text-danger">
                    <span className="fe fe-alert-triangle"></span>&nbsp;Warning
                </h2>
                <div className="d-flex justify-content-center text-center">
                    {message}
                </div>
                <div className={"d-flex justify-content-center align-items-center mt-4"}>
                    <button className="btn btn-primary" onClick={okButtonClick} style={{marginRight: '15px'}}>
                        <span className="fe fe-check"></span>&nbsp;Confirm
                    </button>
                    <button className="btn btn-danger" onClick={cancelButtonClick}>
                        <span className="fe fe-x-circle"></span>&nbsp;Cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
ConfirmDialog.propTypes = {
    message:PropTypes.string,
    onOkButtonClick:PropTypes.func,
    onCancelButtonClick:PropTypes.func,
}

export default ConfirmDialog