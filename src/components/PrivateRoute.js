import React from 'react'
import {AuthenticationService} from '../services/access/AuthenticationService'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {

    // Add your own authentication on the below line.
    const isLoggedIn = AuthenticationService.isLogin();

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
};

export default PrivateRoute