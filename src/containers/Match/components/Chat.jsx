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
                const message = JSON.parse(lastMessage.data);

                switch (message.event_type) {
                    case "leave_match":
                    case "end_turn":
                    case "parcial_move":
                    case "revert_move":
                    case "discard_fig":
                    case "block_fig":
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { 
                                content: message.content, 
                                event: message.event_type
                            }
                        ]);
                        break;
                    default:
                        // mensajes comunes (no de eventos)
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                user_id: message.user_id, 
                                content: message.content
                            }
                        ]);
                        break;
                }
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
        <div data-testid="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.event ? (
                            <strong>{msg.content}</strong>
                        ) : (
                            <>
                                <strong>{msg.user_id === userId ? "Tú" : "Otro jugador"}:</strong> {msg.content}
                            </>
                        )}
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



