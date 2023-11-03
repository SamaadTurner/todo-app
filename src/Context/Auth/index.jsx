import React, { useEffect, useState } from 'react';
const URL = import.meta.env.VITE_BASE_URL;
// import testUsers from './lib/testUsers';
//import {jwtDecode } from "jwt-decode";
import cookie from 'react-cookies';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = React.createContext();

function AuthProvider({children}){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        let cookieToken = cookie.load('auth')
        if(cookieToken){
            _validateToken(cookieToken);
        }
    }, []);

    const _validateToken = (token) => {
        try {
            let validUser = jwtDecode(token);
            console.log(validUser);
            
            if(validUser){
                cookie.save('auth', token)
                setUser(validUser);
                setIsLoggedIn(true);
            }
            setIsLoggedIn(true);
            setToken(token);
        } catch(e){
            setError(e);
            console.log(e);
        }
    }

    const login = async (username, password) => {
        let config = {
            baseURL: URL,
            url: '/signin',
            method: 'post',
            auth: { username, password },
        };
        let response = await axios(config);
        console.log(response);
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
        token,
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