import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useIdStore } from '../../../zustand/store';

export default function ChatComponent() {
    const userId = useIdStore((state) => state.userId);
    const [socketUrl, setSocketUrl] = useState(null);
    const [messages, setMessages] = useState([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (userId) {
            setSocketUrl(`ws://localhost:8000/websocket/chat/${userId}`);
        }
    }, [userId]);
    
    useEffect(() => {
        if (lastMessage) {
            try {
                // Parsear el mensaje JSON recibido
                const message = JSON.parse(lastMessage.data);
                setMessages((prevMessages) => [...prevMessages, message]);
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        }
    }, [lastMessage]);

    const handleSendMessage = (newMessage) => {
        if (newMessage.trim()) {
            sendMessage(newMessage);  // Envía el mensaje al backend
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user_id === userId ? "Tú" : `Usuario ${msg.user_id}`}:</strong> {msg.content}
                    </div>
                ))}
            </div>

            <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
        </div>
    );
}

