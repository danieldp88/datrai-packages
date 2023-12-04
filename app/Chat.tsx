'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState<any | null>([]);
    const [input, setInput] = useState('');

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previene la recarga de la página

        const newMessages = [...messages, { text: input, isUser: true }];

        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:8080/assistant', { question: input });
            setMessages([...newMessages, { text: response.data, isUser: false }]);
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    const renderMessages = () => {
        return messages.map((message: any, index: any) => {
            if('' !== message.text){
                if (message.isUser) {
                    return (
                        <div key={index} className="flex justify-end mb-4">
                            <div className="border border-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                                <p className="text-blue-500 text-sm">{message.text}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="flex justify-start mb-4">
                            <div className="border border-gray-300 rounded-lg px-4 py-2 max-w-[80%]">
                                <p className="text-gray-900 text-sm">{message.text}</p>
                            </div>
                        </div>
                    );
                }
            }
        });
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white p-4">
            <div className="flex-grow overflow-y-auto bg-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-col gap-4">
                    {renderMessages()}
                </div>
            </div>
            <form onSubmit={sendMessage} className="flex justify-center items-center h-16 mt-4">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4" placeholder="Type a message..."/>
                <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Send</button>
            </form>
        </div>
    );
};

export default Chat;
