import React, {Fragment} from 'react';
import {Button, Divider, Grid, TextField} from "@mui/material";

const UpdatePassword = ({
                         setUpdatePassword,
                         updatePassword,
                         handleUpdatePassword,
    passwordError
                     }) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <h6 className="card-title">
                    Update Password Information
                </h6>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="old_password"
                    name="old_password"
                    type="password"
                    label="Current Password"
                    value={updatePassword.current_password}
                    onChange={(e) => setUpdatePassword({...updatePassword, current_password: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {passwordError.current_password && passwordError.current_password.map((error, index) => <Fragment key={index}><span style={{color: "red"}}>{error}</span><br/></Fragment>)}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    value={updatePassword.password}
                    onChange={(e) => setUpdatePassword({...updatePassword, password: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {passwordError.password && <span style={{color: "red"}}>{passwordError.password}</span>}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    label="Password Confirmation"
                    value={updatePassword.password_confirmation}
                    onChange={(e) => setUpdatePassword({...updatePassword, password_confirmation: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{margin: '2rem 0'}}
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePassword}
                    fullWidth
                >
                    Update
                </Button>
            </Grid>
        </Grid>
    )
}
export default UpdatePassword;
