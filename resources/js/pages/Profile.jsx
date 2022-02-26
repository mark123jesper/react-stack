import React, {Fragment, useEffect} from 'react'

import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import api from "../util/api";
import {isLoggedIn} from "../util/auth";
import {logout} from "../store/auth/actions";
import {confirm2FA, confirmPassword, disable2FA, enable2FA, view2FA} from "../store/two-factor-auth/actions";

import PasswordConfirmModal from "../components/two-factor-authentication/PasswordConfirmModal";
import View2FAModal from "../components/two-factor-authentication/View2FAModal";
import TwoFAConfirmModal from "../components/two-factor-authentication/TwoFAConfirmModal";
import {Button, Container, Skeleton} from "@mui/material";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(true);
    const [authLoading, setAuthLoading] = React.useState(false);
    const [twoFALoading, setTwoFALoading] = React.useState(false);

    const [user, setUser] = React.useState([]);
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
        dispatch(confirmPassword(setTwoFALoading, password, confirmationType, setIsConfirmingPassword))
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
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Hi, {user.first_name}!
                                        </h5>
                                        <Button component={Link} to="/home" variant="link" color="primary">
                                            Go to Home
                                        </Button>
                                        <Button
                                            onClick={has2FA ? handleDisable : handleEnable}
                                            variant="link"
                                            color="primary"
                                            disabled={twoFALoading}
                                        >
                                            {has2FA ? 'Disable 2FA' : 'Enable 2FA'}
                                        </Button>
                                        {
                                            has2FA &&
                                            <Button
                                                onClick={handleView2FA}
                                                variant="link"
                                                color="primary"
                                                disabled={twoFALoading}
                                            >
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
