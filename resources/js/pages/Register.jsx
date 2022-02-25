import React from 'react'
import {Button, Container, Grid, Paper, Stack, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import api from "../util/api";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [regData, setRegData] = React.useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleRegistration = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post("/api/register", regData)
            .then(res => {
                Cookies.set("_authenticate", true);
                toast("Registration Successful", {type: "success"});
                navigate('/dashboard');
            })
            .catch(err => {
                if(err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    toast("Something went wrong.", {type: "error"});
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
                            {errors.first_name && <span style={{color: "red"}}>{errors.first_name}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, first_name: e.target.value})}
                                id="first_name" name="first_name" label="First Name" size={"medium"}
                                value={regData.first_name}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Paper style={{padding: 5}}>
                            {errors.middle_name && <span style={{color: "red"}}>{errors.middle_name}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, middle_name: e.target.value})}
                                id="middle_name" name="middle_name" label="Middle Name" size={"medium"}
                                value={regData.middle_name}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Paper style={{padding: 5}}>
                            {errors.last_name && <span style={{color: "red"}}>{errors.last_name}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, last_name: e.target.value})}
                                id="last_name" name="last_name" label="Last Name" size={"medium"}
                                value={regData.last_name}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Paper style={{padding: 5}}>
                            {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, email: e.target.value})}
                                id="email" name="email" label="Email" size={"medium"}
                                value={regData.email}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Paper style={{padding: 5}}>
                            {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, password: e.target.value})}
                                id="password" name="password" label="Password" size={"medium"}
                                value={regData.password}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Paper style={{padding: 5}}>
                            {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
                            <TextField
                                onChange={(e) => setRegData({...regData, password_confirmation: e.target.value})}
                                id="password_confirmation" name="password_confirmation" label="Confirm Password"
                                size={"medium"}
                                value={regData.password_confirmation}
                                variant="standard"
                                style={{width: '100%'}}
                            />
                        </Paper>
                        <Button variant="contained" color="primary" onClick={handleRegistration} disabled={loading}>
                            Register
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

export default Register
