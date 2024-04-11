import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "./AuthContext";
import {useNavigate, useParams} from "react-router-dom";

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const {user} = useContext(AuthContext);
    const {type} = useParams(); // Extract the type parameter from the URL
    const navigate = useNavigate(); // Get the navigate function


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/messages/${type}`, {}, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${user.username}:${user.password}`)}`,
                        'Content-Type': 'application/json',
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [type]);

    const toggleType = () => {
        const newType = type === 'sent' ? 'received' : 'sent';
        navigate(`/messages/${newType}`)
    };

    const redirectToSendMessage = () => {
        navigate('/send-message'); // Redirect to /send-message
    };

    return (
        <>
            <div>
                <button onClick={toggleType}>{type === 'received' ? `Sent messages` : `Received messages`}</button>
                <button onClick={redirectToSendMessage}>Send Message</button>
            </div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>Message {type === 'sent' ? `to user ${message.receiverUsername}` : `from user ${message.senderUsername}`}: {message.content}</div>
                ))}
            </div>
        </>
    );
};

export default MessageList;
