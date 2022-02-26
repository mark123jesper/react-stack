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
    const [user, setUser] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }

        api.get('/api/user').then(res => {
            setUser(res.data.data)
        }).catch(err => {
            console.log(err);
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
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Hi, {user.first_name} {user.middle_name[0]}. {user.last_name}!
                                        </h5>
                                        <Button component={Link} to="/home" variant="link" color="primary">
                                            Go to Home
                                        </Button>
                                        <Button component={Link} to="/profile" variant="link" color="primary">
                                            Go to Profile
                                        </Button>
                                    </div>
                            }
                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export default Dashboard
