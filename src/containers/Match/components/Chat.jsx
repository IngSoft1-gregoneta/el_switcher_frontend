import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useIdStore } from '../../../zustand/store';
import { useParams } from "react-router-dom";

export default function ChatComponent() {
  const userId = useIdStore((state) => state.userId);
  const { user_name } = useParams();
  const [socketUrl, setSocketUrl] = useState(null);
  const [messages, setMessages] = useState([]);
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (userId) {
      setSocketUrl(`ws://localhost:8000/websocket/chat/${userId}/${user_name}`);
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
                user_name: message.user_name,
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
    <div data-testid="chat-container" className="mb-2 flex flex-col items-center justify-center text-center">
      <div className="messages rounded-lg bg-[#2f4550] bg-opacity-80 p-4 shadow-lg text-[#e8e5da] w-full max-w-xl h-48 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg.event ? (
              <strong className="block text-lg">{msg.content}</strong>
            ) : (
              <>
                <strong className="text-lg">{msg.user_id === userId ? "Tú" : msg.user_name}:</strong>
                <span>{msg.content}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="mt-4 p-2 rounded-lg bg-[#2f4550] bg-opacity-70 text-[#e8e5da] border-2 border-[#66a1ff] focus:outline-none focus:border-[#4d91e0] transition-colors w-full max-w-xl h-12"
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



