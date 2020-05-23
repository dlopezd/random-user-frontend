import React, { useState } from 'react';
import axios from 'axios';


export const AuthContext = React.createContext({
    isAuth: false,
    token: '',
    email: '',
    error: '',
    login: async (token, email) => { },
    logout: _ => { }
});

const apikey = 'AIzaSyBjbb4A8aFL6Q55WZo6aTT0q5X_NbhPNUs';
const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`;

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')

    const loginHandler = async (email, password) => {
        try {
            const response = await axios({
                method: 'post',
                url: endpoint,
                data: {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEmail(email);
            setToken(response.idToken);
            setIsAuthenticated(true);
            setError('')
            return true;

        }
        catch (error) {
            setError(error.response.data.error.message);
            return false;
        }
    };

    const logoutHandler = _ => {
        setIsAuthenticated(false);
        setToken('');
        setEmail('');
    }

    return (
        <AuthContext.Provider
            value={{ login: loginHandler, logout: logoutHandler, isAuth: isAuthenticated, token: token, error: error }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;