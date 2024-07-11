import React, { useEffect } from 'react'
import { useUsersStore } from '../zustand/useUsersStore'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore';
import { useAuthStore } from '../zustand/useAuthStore';
import dotenv from "dotenv"


import axios from 'axios';

dotenv.config();

const ChatUsers = () => {
    const { users } = useUsersStore();
    const { authName } = useAuthStore();
    const { updateChatReceiver, chatReceiver } = useChatReceiverStore();
    const { updateChatMsgs } = useChatMsgsStore();

    const setChatReceiver = (user) => {
        updateChatReceiver(user.username);
    }

    useEffect(() => {
        const getMsgs = async () => {

            const res = await axios.get(`http://localhost:5000/msgs`,
                {
                    params: {
                        'sender': authName,
                        'receiver': chatReceiver
                    }
                },
                {
                    withCredentials: true
                });
            if (res.data.length !== 0) {
                updateChatMsgs(res.data);
            } else {
                updateChatMsgs([]);
            }
        }
        if (chatReceiver) {
            getMsgs();
        }
    }, [chatReceiver])

    return (
        <div>
            <div className='  m-3 '>
                <img src="/logo.png" alt="Logo" className="w-full" />
            </div>
            {users.map((user, index) => (

                <div key={index} onClick={() => setChatReceiver(user)} className='flex items-center font-mono text-[#fedaed] subpixel-antialiased font-semibold bg-[#b67d9a] rounded-xl m-3 p-5 hover:bg-[#b792a5]'>
                    <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute  w-10 h-10x text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <span className='ml-3'>{user.username}</span>
                </div>



            ))
            }
        </div >


    )
}

export default ChatUsers
