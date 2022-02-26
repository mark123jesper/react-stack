import React from 'react';
import {Button, Container, Grid, Modal, Paper} from "@mui/material";

const TwoFAConfirmModal = ({
   isConfirming2FA,
   setIsConfirming2FA,
   qrCode,
   twoFACode,
   setTwoFACode,
   confirm2FA,
}) => {
    return (
        <Modal open={isConfirming2FA} onClose={() => setIsConfirming2FA(false)}>
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper>
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm 2FA Code</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => setIsConfirming2FA(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Grid container spacing={2} className="modal-body">
                        <Grid item sm={12}>
                            <p>Scan the QR using Google Authenticator</p>
                            <span dangerouslySetInnerHTML={{__html: qrCode}}/>
                        </Grid>
                        <Grid item sm={12}>
                            <p>Please confirm using your Authenticator Code.</p>
                            <input onChange={(e) => setTwoFACode(e.target.value)} type="text" value={twoFACode} className="form-control" placeholder="2FA Code"/>
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained" color="primary" onClick={confirm2FA}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Modal>
    )
}
export default TwoFAConfirmModal;
