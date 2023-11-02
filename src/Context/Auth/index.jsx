import React, { useEffect, useState } from 'react';
// import testUsers from './lib/testUsers';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies';
import axios from 'axios';

export const AuthContext = React.createContext();

function AuthProvider({children}){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let cookieToken = cookie.load('auth')
        _validateToken(cookieToken);
    }, []);

    const _validateToken = (token) => {
        try {
            let validUser = jwt_decode(token);
            if(validUser){
                cookie.save('auth', token)
                setUser(validUser);
                setIsLoggedIn(true);
            }
        } catch(e){
            setError(e);
            console.log(e);
        }
    }

    const login = async (username, password) => {
        let config = {
            baseURL: 'https://api-js401.herokuapp.com',
            url: '/signin',
            method: 'post',
            auth: { username, password },
        };
        let response = await axios(config);
        let token = response.data.token;
        if(token){
            try{
                _validateToken(token);
            } catch(e){
                setError(e);
                console.log(e);
            }
        }
    }

    const logout = () => {
        setUser({});
        setIsLoggedIn(false);
        cookie.remove('auth');
    }

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    }

    const values = {
        isLoggedIn,
        user,
        error,
        login,
        logout,
        can,
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;