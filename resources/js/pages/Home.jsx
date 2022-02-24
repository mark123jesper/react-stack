import React, {Fragment, useEffect} from 'react'
import {Button, Container} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <Container>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card text-center p-2">
                            <div className="card-header">Home Component</div>

                            <div className="card-body">I'm a root component!</div>

                            <div>
                                <Button component={Link} to="/login" variant="link" color="primary">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export default Home
