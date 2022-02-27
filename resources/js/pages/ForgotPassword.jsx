import React from 'react'
import {Button, Container, Grid, Paper, Stack, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import api from "../util/api";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [resetData, setResetData] = React.useState({
        email: '',
    });
    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleReset = (e) => {
        setLoading(true);
        api.post("/api/forgot-password", resetData)
            .then(res => {
                setIsEmailSent(true);
                setLoading(false);
                setResetData({
                    email: '',
                });
                setErrors([]);
            })
            .catch(err => {
                if(err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    toast(err?.response?.data?.errors[0], {type: "error"});
                    setErrors(err.response.data.errors);
                }
                setLoading(false);
            });
    }


    return (
        <Container>
            <Paper elevation={3} style={{padding: 25, width: "auto"}}>
                <Grid container justifyContent="center">
                    <Stack spacing={2}>
                        <Paper style={{padding: 5}}>
                            {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
                            <TextField
                                onChange={(e) => setResetData({...resetData, email: e.target.value})}
                                id="email" name="email" label="Email Address" size={"medium"}
                                value={resetData.email}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                            {isEmailSent && <span style={{color: "green"}}>An email has been sent to you with a link to reset your password.</span>}
                        </Paper>
                        <Button variant="contained" color="primary" onClick={handleReset} disabled={loading}>
                            Send Reset Link
                        </Button>
                        <Button component={Link} to={"/login"} variant="link" color="primary">
                            Already have an account? Login here
                        </Button>
                    </Stack>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ForgotPassword
