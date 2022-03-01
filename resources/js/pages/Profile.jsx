import React, {Fragment, useEffect} from 'react'

import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import api from "../util/api";
import {isLoggedIn} from "../util/auth";
import {logout} from "../store/auth/actions";
import {confirm2FA, disable2FA, enable2FA, view2FA} from "../store/two-factor-auth/actions";

import PasswordConfirmModal from "../components/two-factor-authentication/PasswordConfirmModal";
import View2FAModal from "../components/two-factor-authentication/View2FAModal";
import TwoFAConfirmModal from "../components/two-factor-authentication/TwoFAConfirmModal";
import {Button, Container, Divider, Grid, Skeleton, TextField} from "@mui/material";
import {toast} from "react-toastify";
import UpdateUser from "../components/profile-information/UpdateUser";
import UpdatePassword from "../components/profile-information/UpdatePassword";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(true);
    const [authLoading, setAuthLoading] = React.useState(false);
    const [twoFALoading, setTwoFALoading] = React.useState(false);

    const [user, setUser] = React.useState([]);
    const [updatePassword, setUpdatePassword] = React.useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    })
    const [userError, setUserError] = React.useState([]);
    const [passwordError, setPasswordError] = React.useState([]);
    const [has2FA, setHas2FA] = React.useState(false);
    const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false);
    const [isConfirming2FA, setIsConfirming2FA] = React.useState(false);
    const [isViewing2FA, setIsViewing2FA] = React.useState(false);

    const [qrCode, setQrCode] = React.useState();
    const [recoveryCode, setRecoveryCode] = React.useState([]);

    const [password, setPassword] = React.useState('');
    const [twoFACode, setTwoFACode] = React.useState('');

    const [confirmationType, setConfirmationType] = React.useState('');

    const handleConfirm2FA = () => {
        dispatch(confirm2FA(setTwoFALoading, setRecoveryCode, setHas2FA, setIsConfirming2FA, setIsViewing2FA, setIsConfirmingPassword, setConfirmationType, twoFACode));
    };


    const handleConfirmPassword = () => {
        toast.info('Confirming Password...', {autoClose: 2000});
        setTwoFALoading(true);
        api.post('/api/user/confirm-password', {password: password}).then(() => {
            switch (confirmationType) {
                case 'enable':
                    dispatch(enable2FA(setTwoFALoading, setQrCode, setIsConfirming2FA, setIsConfirmingPassword, setConfirmationType));
                    break;
                case 'disable':
                    dispatch(disable2FA(setTwoFALoading, setHas2FA, setIsConfirmingPassword, setConfirmationType));
                    break;
                case 'view':
                    dispatch(view2FA(setTwoFALoading, setRecoveryCode, setIsConfirmingPassword, setConfirmationType, setIsViewing2FA))
                    break;
                default:
                    break;
            }
            setIsConfirmingPassword(false);
            setTwoFALoading(false);
        }).catch(err => {
            toast.error('Invalid Password. Failed to Proceed', {autoClose: 2000});
            setTwoFALoading(false);
        })
    }

    const handleEnable = () => {
        dispatch(enable2FA(setTwoFALoading, setQrCode, setIsConfirming2FA, setIsConfirmingPassword, setConfirmationType));
    }

    const handleDisable = () => {
        dispatch(disable2FA(setTwoFALoading, setHas2FA, setIsConfirmingPassword, setConfirmationType));
    }

    const handleView2FA = () => {
        dispatch(view2FA(setTwoFALoading, setRecoveryCode, setIsConfirmingPassword, setConfirmationType, setIsViewing2FA))
    }

    const handleLogout = () => {
        dispatch(logout(navigate, setAuthLoading));
    };

    const handleUpdateUser = () => {
        api.put('/api/user/profile-information', user).then(() => {
            toast.success('Successfully Updated User Information', {autoClose: 2000});
            setUserError([]);
        }).catch(err => {
            toast.error('Failed to Update User Information', {autoClose: 2000});
            setUserError(err.response.data.errors);
        })
    }

    const handleResend = () =>{
        api.post('/api/email/verification-notification', user.email).then(res => {
            toast.success(res.data.message);
        }).catch(err => {
            setErrors(err.response.data.errors);
        })
    }

    const handleUpdatePassword = () => {
        api.put('/api/user/password', updatePassword).then(() => {
            toast.success('Successfully Updated Password Information', {autoClose: 2000});
            setUpdatePassword({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
            setPasswordError([]);
        }).catch(err => {
            toast.error('Failed to Update Password Information', {autoClose: 2000});
            setPasswordError(err.response.data.errors);
        })
    }

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
                            <div className="card-header">Profile Component</div>
                            {
                                isLoading
                                    ?
                                    <Skeleton variant="rectangular" height={50}/>
                                    :
                                    <Grid container spacing={3} className="card-body">
                                        {
                                            user.isVerified ?
                                                null :
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="primary" onClick={handleResend}>
                                                        Resend Email Verification
                                                    </Button>
                                                </Grid>
                                        }
                                        <Grid item xs={12}>
                                            <h5 className="card-title">
                                                Hi, {user.first_name} {user.middle_name[0]}. {user.last_name}!
                                            </h5>
                                        </Grid>
                                        <UpdateUser
                                            user={user}
                                            setUser={setUser}
                                            handleUpdateUser={handleUpdateUser}
                                            userError={userError}
                                        />
                                        <UpdatePassword
                                            updatePassword={updatePassword}
                                            setUpdatePassword={setUpdatePassword}
                                            handleUpdatePassword={handleUpdatePassword}
                                            passwordError={passwordError}
                                        />
                                        <Grid item xs={12}>
                                            <Button
                                                onClick={has2FA ? handleDisable : handleEnable}
                                                variant="link"
                                                color="primary"
                                                disabled={twoFALoading}
                                            >
                                                {has2FA ? 'Disable 2FA' : 'Enable 2FA'}
                                            </Button>
                                        </Grid>
                                        {
                                            has2FA &&
                                            <Grid item xs={12}>
                                                <Button
                                                    onClick={handleView2FA}
                                                    variant="link"
                                                    color="primary"
                                                    disabled={twoFALoading}
                                                >
                                                    View Recovery Codes
                                                </Button>
                                            </Grid>
                                        }
                                        <Grid item xs={12}>
                                            <Button component={Link} to="/home" variant="link" color="primary">
                                                Go to Home
                                            </Button>
                                        </Grid>
                                    </Grid>
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
            <PasswordConfirmModal
                isConfirmingPassword={isConfirmingPassword}
                setIsConfirmingPassword={setIsConfirmingPassword}
                password={password}
                setPassword={setPassword}
                confirmPassword={handleConfirmPassword}
            />

            {/*2FA Confirm Modal*/}
            <TwoFAConfirmModal
                isConfirming2FA={isConfirming2FA}
                setIsConfirming2FA={setIsConfirming2FA}
                qrCode={qrCode}
                twoFACode={twoFACode}
                setTwoFACode={setTwoFACode}
                confirm2FA={handleConfirm2FA}
            />

            {/*Two Factor Auth View Modal*/}
            <View2FAModal
                has2FA={has2FA}
                isViewing2FA={isViewing2FA}
                setIsViewing2FA={setIsViewing2FA}
                recoveryCode={recoveryCode}
            />
        </Fragment>
    )
}

export default Profile
