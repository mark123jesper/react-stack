import Cookies from "js-cookie";
import api from "../../util/api";
import {toast} from "react-toastify";

/**
 * @description - Action creator for login
 */
export const enable2FA = (setTwoFALoading, setQrCode, setIsConfirming2FA, setIsConfirmingPassword, setConfirmationType) => {
    return async () => {
        toast.info('Processing 2FA...', {autoClose: 2000});
        setTwoFALoading(true);
        await api.post('/api/user/two-factor-authentication').then(() => {
            api.get('/api/user/two-factor-qr-code').then(res => {
                setQrCode(res.data.svg);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsConfirming2FA(true);
                setTwoFALoading(false);
            });
        }).catch(err => {
            if (err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('enable');
                setTwoFALoading(false);
            }
        })
    }
}

export const disable2FA = (setTwoFALoading, setHas2FA, setIsConfirmingPassword, setConfirmationType) => {
    return async () => {
        toast.info('Processing 2FA...', {autoClose: 2000});
        setTwoFALoading(true);
        await api.delete('/api/user/two-factor-authentication').then(() => {
            setHas2FA(false);
            setTwoFALoading(false);
        }).catch(err => {
            if (err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('disable');
                setTwoFALoading(false);
            }
        })
    }
}

export const view2FA = (setTwoFALoading, setRecoveryCode, setIsConfirmingPassword, setConfirmationType) => {
    return async () => {
        toast.info('Processing Recovery Codes...', {autoClose: 2000});
        setTwoFALoading(true);
        await api.get('/api/user/two-factor-recovery-codes').then(res => {
            setRecoveryCode(res.data);
            setTwoFALoading(false);
        }).catch(err => {
            if (err.response.status === 423) {
                setIsConfirmingPassword(true);
                setConfirmationType('view');
                setTwoFALoading(false);
            }
        })
    }
}

export const confirmPassword = (setTwoFALoading, password, confirmationType, setIsConfirmingPassword) => {
    return async () => {
        toast.info('Confirming Password...', {autoClose: 2000});
        setTwoFALoading(true);
        api.post('/api/user/confirm-password', {password: password}).then(() => {
            switch (confirmationType) {
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
            setTwoFALoading(false);
        }).catch(err => {
            toast.error('Invalid Password. Failed to Proceed', {autoClose: 2000});
            setTwoFALoading(false);
        })
    }
}

export const confirm2FA = (setTwoFALoading, setRecoveryCode, setHas2FA, setIsConfirming2FA, setIsViewing2FA, setIsConfirmingPassword, setConfirmationType) => {
    return async () => {
        toast.info('Confirming 2FA...', {autoClose: 2000});
        setTwoFALoading(true);
        await api.post('api/user/confirmed-two-factor-authentication', {"code": twoFACode}).then(() => {
            api.get('/api/user/two-factor-recovery-codes').then(res => {
                setRecoveryCode(res.data);
                toast.success('2FA Enabled', {autoClose: 2000});
                setHas2FA(true);
                setIsConfirming2FA(false);
                setIsViewing2FA(true);
                setTwoFALoading(false);
            }).catch(err => {
                if (err.response.status === 423) {
                    setIsConfirmingPassword(true);
                    setConfirmationType('view');
                }
            })
        }).catch(err => {
            toast.error('Invalid 2FA Code. Failed to Enable', {autoClose: 2000});
            setTwoFALoading(false);
        })
    }
}

