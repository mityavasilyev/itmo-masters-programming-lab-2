import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate function
    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {username, password}, {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data);
            // Handle successful login
            login(username, password);
            navigate('/messages/received');
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const redirectToSendMessage = () => {
        navigate('/register'); // Redirect to /send-message
    };

    return (<>
            <div>
                <button onClick={redirectToSendMessage}>Register</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginForm;
