import React, {Fragment, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {login} from '../store/auth/actions'

import { Button, Container, Grid, Paper, Stack, TextField} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {isLoggedIn} from "../util/auth";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = React.useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(login(loginData, setLoading, navigate))
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <Fragment>
            <Container>
                <Paper elevation={3} style={{padding: 25}}>
                    <Grid container justifyContent="center">
                        <Stack spacing={2}>
                            <Paper style={{padding: 5}}>
                                <TextField onChange={(e) => setLoginData({...loginData, email: e.target.value})} id="email" name="email" label="Email" size={"medium"} variant="standard"/>
                                <AccountCircle fontSize={"medium"} style={{margin: 2}}/>
                            </Paper>
                            <Paper style={{padding: 5}}>
                                <TextField onChange={(e) => setLoginData({...loginData, password: e.target.value})} id="password" name="password" label="Password" size={"medium"} variant="standard"/>
                                <VisibilityIcon fontSize={"medium"} style={{margin: 2}}/>
                            </Paper>
                            <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
                                Login
                            </Button>
                        </Stack>
                    </Grid>
                </Paper>
            </Container>
        </Fragment>
    )
}

export default Login
