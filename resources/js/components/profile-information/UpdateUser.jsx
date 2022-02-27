import React from 'react';
import {Button, Divider, Grid, TextField} from "@mui/material";

const UpodateUser = ({
                         user,
                         setUser,
                         handleUpdateUser,
    userError,
                     }) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <h6 className="card-title">
                    Profile Information
                </h6>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={user.first_name}
                    onChange={(e) => setUser({...user, first_name: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {userError.first_name && <span style={{color: "red"}}>{userError.first_name}</span>}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="middle_name"
                    name="middle_name"
                    label="Middle Name"
                    value={user.middle_name}
                    onChange={(e) => setUser({...user, middle_name: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {userError.middle_name && <span style={{color: "red"}}>{userError.middle_name}</span>}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={user.last_name}
                    onChange={(e) => setUser({...user, last_name: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {userError.last_name && <span style={{color: "red"}}>{userError.last_name}</span>}
            </Grid>
            <Grid item xs={12}>
                <Divider variant="middle" style={{margin: '2rem 0'}}/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    variant="outlined"
                    fullWidth
                />
                {userError.email && <span style={{color: "red"}}>{userError.email}</span>}
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{margin: '2rem 0'}}
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateUser()}
                    fullWidth
                >
                    Update
                </Button>
            </Grid>
        </Grid>
    )
}
export default UpodateUser;
