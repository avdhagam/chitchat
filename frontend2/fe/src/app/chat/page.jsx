

'use client'
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { useAuthStore } from "../zustand/useAuthStore";
import { useUsersStore } from '../zustand/useUsersStore';
import axios from 'axios';
import ChatUsers from '../_components/chatUsers.jsx';
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore';


const Chat = () => {

    const getUserData = async () => {
        const res = await axios.get('http://localhost:8081/users', {
            withCredentials: true
        })
        updateUsers(res.data);
        console.log(res.data);
    }


    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);
    //const [msgs, setMsgs] = useState([]);
    const { authName } = useAuthStore();
    const { updateUsers } = useUsersStore();
    const { chatReceiver } = useChatReceiverStore();
    const { chatMsgs, updateChatMsgs } = useChatMsgsStore();



    useEffect(() => {
        // Establish WebSocket connection
        const newSocket = io('http://localhost:5001', {
            query: {
                username: authName
            }
        });
        setSocket(newSocket);

        newSocket.on('chat msg', (msg) => {
            console.log('Received message:', msg);
            updateChatMsgs([...chatMsgs, msg]);
            //setMsgs(prevMsgs => [...prevMsgs, { text: msg.text, SentByCurrUser: false }]); // Update the state to include the new message
        });

        getUserData();

        // Clean up function
        return () => newSocket.close();
    }, []);

    const sendMsg = (e) => {
        e.preventDefault();
        const msgtobesent = {
            text: msg,
            sender: authName,
            receiver: chatReceiver
        };
        if (socket) {
            socket.emit('chat msg', msgtobesent);
            updateChatMsgs([...chatMsgs, msgtobesent]);
            // setMsgs(prevMsgs => [...prevMsgs, { text: msg, SentByCurrUser: true }]);
            setMsg('');
        }
    }


    return (
        <div className='h-screen flex divide-x-4 divide-[#f5c6c9]'>
            <div className='w-1/5 bg-[#fadedf]'>

                <ChatUsers></ChatUsers>
            </div>

            <div className='w-4/5 flex flex-col '>
                <div className='w-full bg-[#fadedf] p-3  flex items-center'>
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-4">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 className='text-xl text-[#b88889] font-semibold'>{chatReceiver}</h1>

                </div>


                <div className='msgs-container h-4/5 overflow-y-auto '>
                    {chatMsgs.map((msg, index) => (
                        <div key={index} className={`m-4  p-1 ${msg.sender === authName ? 'text-right' :
                            'text-left'}`}>
                            <span className={`${msg.sender === authName ? 'bg-[#e6b2cd]' : 'bg-[#e6b2cd]'} p-3 my-5 rounded-2xl`}>
                                {msg.text}
                            </span>


                        </div>
                    ))}
                </div>

                <form onSubmit={sendMsg} className="max-w-md mx-auto my-10 w-1/2">
                    <div className="relative">
                        <input type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Type your text here"
                            required
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-[#b67d9a] hover:bg-[#f9d6e9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Chat