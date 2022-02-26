import React from 'react';
import {Container, Modal, Paper} from "@mui/material";

const View2FAModal = ({
  has2FA,
  isViewing2FA,
  setIsViewing2FA,
  recoveryCode,
}) => {
    return (
        <Modal open={has2FA && isViewing2FA} onClose={() => setIsViewing2FA(false)}>
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "50%"}}>
                    <div className="modal-header">
                        <h5 className="modal-title">2FA Authentication</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => setIsViewing2FA(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-center">
                        <p>2FA Recovery Codes</p>
                        {
                            recoveryCode.map((code, index) => (
                                <div key={index}>
                                    <code>{code}</code>
                                </div>
                            ))
                        }
                    </div>
                </Paper>
            </Container>
        </Modal>
    )
}
export default View2FAModal;
