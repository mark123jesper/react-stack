import React from 'react';
import {Button, Container, Grid, Modal, Paper} from "@mui/material";

const PasswordConfirmModal = ({
    isConfirmingPassword,
    setIsConfirmingPassword,
    password,
    setPassword,
    confirmPassword,
}) => {
    return (
        <Modal open={isConfirmingPassword} onClose={() => setIsConfirmingPassword(false)}>
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper>
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Password</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => setIsConfirmingPassword(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Grid container spacing={2} className="modal-body">
                        <Grid item sm={12}>
                            <p>Please confirm your password to continue.</p>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" value={password}
                                   className="form-control" placeholder="Password"/>
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant="contained" color="primary" onClick={confirmPassword}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Modal>
    )
}
export default PasswordConfirmModal;
