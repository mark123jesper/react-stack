import React, {useEffect} from 'react'
import {Button, Container, Grid, Paper, Stack, TextField} from "@mui/material";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import api from "../util/api";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const ResetPassword = () => {
    const {token} = useParams()
    const emailParam = new URLSearchParams(window.location.search).get('email')
    const navigate = useNavigate();
    const [resetData, setResetData] = React.useState({
        email: emailParam,
        token: token,
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleReset = (e) => {
        setLoading(true);
        api.post("/api/reset-password", resetData)
            .then(res => {
                setLoading(false);
                setErrors([]);
                toast.success("Password reset successfully!");
                navigate('/login');
            })
            .catch(err => {
                if(err.response.status === 422) {
                    toast.error("Password reset failed!");
                    setErrors(err.response.data.errors);
                } else {
                    toast.error("Something went wrong!");
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
                            <TextField
                                onChange={(e) => setResetData({...resetData, password: e.target.value})}
                                id="password" name="password" label="New Password" size={"medium"}
                                value={resetData.password}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                            {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
                            <TextField
                                onChange={(e) => setResetData({...resetData, password_confirmation: e.target.value})}
                                id="password_confirmation" name="password_confirmation" label="Password Confirmation" size={"medium"}
                                value={resetData.password_confirmation}
                                variant="standard"
                                style={{width: '100%'}}
                            />
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

export default ResetPassword
