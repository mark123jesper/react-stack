import React, {Fragment, useEffect} from 'react'

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import api from "../util/api";
import {isLoggedIn} from "../util/auth";
import {logout} from "../store/auth/actions";

import {Button, Container, Skeleton} from "@mui/material";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(true);
    const [authLoading, setAuthLoading] = React.useState(false);
    const [user, setUser] = React.useState([]);

    const handleLogout = () => {
        setAuthLoading(true);
        dispatch(logout(navigate, setAuthLoading));
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }

        api.get('/api/user').then(res => {
            setUser(res.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])


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
                                    <div className="card-body">Hi, {user.first_name}!</div>
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
        </Fragment>
    )
}

export default Dashboard
