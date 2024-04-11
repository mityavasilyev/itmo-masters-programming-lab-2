import React, {useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const SendMessageForm = () => {
    const [content, setContent] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/messages', {content, receiverUsername}, {
                headers: {
                    'Authorization': `Basic ${btoa(`${user.username}:${user.password}`)}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const redirectToReceivedMessages = () => {
        navigate('/messages/received'); // Redirect to /send-message
    };

    return (
        <>
            <div>
                <button onClick={redirectToReceivedMessages}>Messages</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Message"/>
                <input type="text" value={receiverUsername} onChange={(e) => setReceiverUsername(e.target.value)}
                       placeholder="Receiver Username"/>
                <button type="submit">Send</button>
            </form>
        </>
    );
};

export default SendMessageForm;
