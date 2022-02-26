import React, {Fragment, useEffect} from 'react'

import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import {login, twoFactorLogin} from '../store/auth/actions'

import {Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, Stack, TextField} from '@mui/material'
import {isLoggedIn} from "../util/auth";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    })
    const [twoFACode, setTwoFACode] = React.useState({
        code: "",
        recovery_code: "",
    })
    const [loading, setLoading] = React.useState(false)
    const [twoFA, setTwoFA] = React.useState(false)
    const [useRecovery, setUseRecovery] = React.useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(login(loginData, setLoading, navigate, setTwoFA))
    }

    const handleTwoFactorLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(twoFactorLogin(twoFACode, setLoading, navigate))
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <Fragment>
            {
                twoFA ?
                    <Container>
                        <Paper elevation={3} style={{padding: 25}}>
                            <Grid container justifyContent="center">
                                <Stack spacing={2}>
                                    <Paper style={{padding: 5}}>
                                        {
                                            useRecovery
                                                ?
                                                <TextField
                                                    onChange={(e) => setTwoFACode({
                                                        ...twoFACode,
                                                        recovery_code: e.target.value,
                                                        code: null
                                                    })}
                                                    id="code"
                                                    name="code"
                                                    label="2FA Code"
                                                    size={"medium"}
                                                    value={twoFACode.recovery_code}
                                                    variant="standard"
                                                />
                                                :
                                                <TextField
                                                    onChange={(e) => setTwoFACode({
                                                        ...twoFACode,
                                                        code: e.target.value,
                                                        recovery_code: null
                                                    })}
                                                    id="code"
                                                    name="code"
                                                    label="2FA Code"
                                                    size={"medium"}
                                                    value={twoFACode.code}
                                                    variant="standard"
                                                />
                                        }
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={useRecovery}
                                                                   onChange={() => setUseRecovery(!useRecovery)}/>}
                                                label="Use Recovery Code"
                                            />
                                        </FormGroup>
                                    </Paper>
                                    <Button variant="contained" color="primary" onClick={handleTwoFactorLogin}
                                            disabled={loading}>
                                        Submit 2FA
                                    </Button>
                                </Stack>
                            </Grid>
                        </Paper>
                    </Container>
                    :
                    <Container>
                        <Paper elevation={3} style={{padding: 25}}>
                            <Grid container justifyContent="center">
                                <Stack spacing={2}>
                                    <Paper style={{padding: 5}}>
                                        <TextField
                                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                            id="email" name="email" label="Email" size={"medium"}
                                            value={loginData.email}
                                            variant="standard"
                                            style={{width: '100%'}}/>
                                    </Paper>
                                    <Paper style={{padding: 5}}>
                                        <TextField
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                            id="password" name="password" label="Password" size={"medium"}
                                            value={loginData.password}
                                            variant="standard"
                                            style={{width: '100%'}}/>
                                    </Paper>
                                    <Button variant="contained" color="primary" onClick={handleLogin}
                                            disabled={loading}>
                                        Login
                                    </Button>
                                    <Button component={Link} to={"/register"} variant="link" color="primary">
                                        Don't have an account? Register here
                                    </Button>
                                </Stack>
                            </Grid>
                        </Paper>
                    </Container>
            }
        </Fragment>
    )
}

export default Login
