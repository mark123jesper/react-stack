import React, {Fragment, useEffect} from 'react'

import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import api from "../util/api";
import {logout} from "../store/auth/actions";

import {Button, Container, Grid, Modal, Paper, Skeleton} from "@mui/material";
import {isLoggedIn} from "../util/auth";
import {toast} from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(true);
    const [authLoading, setAuthLoading] = React.useState(false);

    const [user, setUser] = React.useState([]);
    const [has2FA, setHas2FA] = React.useState(false);
    const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false);
    const [isConfirming2FA, setIsConfirming2FA] = React.useState(false);
    const [isViewing2FA, setIsViewing2FA] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [twoFACode, setTwoFACode] = React.useState('');
    const [qrCode, setQrCode] = React.useState();
    const [recoveryCode, setRecoveryCode] = React.useState([]);
    const [confirmationType, setConfirmationType] = React.useState('');

    const enable2FA = () => {
        toast.info('Processing 2FA...', {autoClose: 2000});
        api.post('/api/user/two-factor-authentication').then(() => {
            api.get('/api/user/two-factor-qr-code').then(res => {
                setQrCode(res.data.svg);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsConfirming2FA(true);
            });
        }).catch(err => {
            if(err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('enable');
            }
        })
    }

    const disable2FA = () => {
        toast.info('Processing 2FA...', {autoClose: 2000});
        api.delete('/api/user/two-factor-authentication').then(res => {
            console.log(res);
            setHas2FA(false);
        }).catch(err => {
            if(err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('disable');
            }
        })
    }

    const view2FA = () => {
        toast.info('Processing Recovery Codes...', {autoClose: 2000});
        api.get('/api/user/two-factor-recovery-codes').then(res => {
            setRecoveryCode(res.data);
            setIsViewing2FA(true);
        }).catch(err => {
            if(err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('view');
            }
        })
    }

    const confirmPassword = () => {
        toast.info('Confirming Password...', {autoClose: 2000});
        api.post('/api/user/confirm-password', {password: password}).then(() => {
            switch(confirmationType) {
                case 'enable':
                    enable2FA();
                    break;
                case 'disable':
                    disable2FA();
                    break;
                case 'view':
                    view2FA();
                    break;
                default:
                    break;
            }
            setIsConfirmingPassword(false);
        }).catch(err => {
            toast.error('Invalid Password. Failed to Proceed', {autoClose: 2000});
            console.log(err)
        })
    }

    const confirm2FA = () => {
        toast.info('Confirming 2FA...', {autoClose: 2000});
        api.post('api/user/confirmed-two-factor-authentication', {"code": twoFACode}).then(() => {
            api.get('/api/user/two-factor-recovery-codes').then(res => {
                setRecoveryCode(res.data);
                toast.success('2FA Enabled', {autoClose: 2000});
                setHas2FA(true);
                setIsConfirming2FA(false);
                setIsViewing2FA(true);
            }).catch(err => {
                if(err.response.status === 423) {
                    setIsConfirmingPassword(true);
                    setConfirmationType('view');
                }
            })
        }).catch(err => {
            toast.error('Invalid 2FA Code. Failed to Enable', {autoClose: 2000});
        })
    }

    const handleLogout = () => {
        setAuthLoading(true);
        dispatch(logout(navigate, setAuthLoading));
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }

        api.get('/api/user').then(res => {
            setUser(res.data.data)
            setHas2FA(!!res?.data?.data.has2FA)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log(confirmationType);
    }, [confirmationType])


    return (
        <Fragment>
            <Container>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card text-center">
                            <div className="card-header">Dashboard Component</div>
                            {
                                isLoading
                                    ?
                                    <Skeleton variant="rectangular" height={50}/>
                                    :
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Hi, {user.first_name}!
                                        </h5>
                                        <Button component={Link} to="/home" variant="link" color="primary">
                                            Go to Home
                                        </Button>
                                        <Button onClick={has2FA ? disable2FA : enable2FA} variant="link" color="primary">
                                            {has2FA ? 'Disable 2FA' : 'Enable 2FA'}
                                        </Button>
                                        {
                                            has2FA &&
                                            <Button onClick={view2FA} variant="link" color="primary">
                                                View Recovery Codes
                                            </Button>
                                        }
                                    </div>
                            }
                            <div className="card-body">
                                <Button variant="contained" color="primary" onClick={handleLogout}
                                        disabled={authLoading}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/*Password Confirm Modal*/}
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
                                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className="form-control" placeholder="Password"/>
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

            {/*2FA Confirm Modal*/}
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

            {/*Two Factor Auth View Modal*/}
            <Modal open={has2FA && isViewing2FA} onClose={() => setIsViewing2FA(false)}>
                <Container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Paper style={{width: "50%"}}>
                        <div className="modal-header">
                            <h5 className="modal-title">2FA Authentication</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => setIsViewing2FA(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <p>2FA Recovery Codes</p>
                            {
                                recoveryCode.map((code, index) => (
                                    <div key={index}>
                                        <code>{code}</code>
                                    </div>
                                ))
                            }
                        </div>
                    </Paper>
                </Container>
            </Modal>
        </Fragment>
    )
}

export default Dashboard
