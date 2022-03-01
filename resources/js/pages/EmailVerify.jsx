import React from 'react'
import {Button, Container, Grid, Paper, Stack, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import api from "../util/api";
import {toast} from "react-toastify";

const EmailVerify = () => {
    const urlParam = new URLSearchParams(window.location.search).get('url')
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);

    const handleVerify = () => {
        setLoading(true);
        api.get(urlParam)
            .then(() => {
                setLoading(false);
                setIsVerified(true);
                toast.success("Email Successfuly Verified");
                window.location.replace('/login');
            })
            .catch(err => {
                toast.error("Something Went Wrong");
                console.log(err.response)
                setLoading(false);
            });
    }

    return (
        <Container>
            <Paper elevation={3} style={{padding: 25, width: "auto"}}>
                <Grid container justifyContent="center">
                    <Stack spacing={2}>
                        {
                            isVerified ?
                                <h1>
                                    Email is now verified.
                                </h1>
                                :
                                <Button variant="contained" color="primary" onClick={handleVerify} disabled={loading}>
                                    Verify Email
                                </Button>
                        }
                    </Stack>
                </Grid>
            </Paper>
        </Container>
    )
}

export default EmailVerify
