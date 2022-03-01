import React, {Fragment, useEffect} from 'react'

import {Link, useNavigate} from "react-router-dom";

import {Button, Container} from "@mui/material";
import {isLoggedIn} from "../util/auth";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login')
        }
    }, [])


    return (
        <Fragment>
            <Container>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card text-center">
                            <div className="card-header">Dashboard Component</div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    This is the Dashboard Component
                                </h5>
                                <Button component={Link} to="/home" variant="link" color="primary">
                                    Go to Home
                                </Button>
                                <Button component={Link} to="/profile" variant="link" color="primary">
                                    Go to Profile
                                </Button>
                            </div>
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
