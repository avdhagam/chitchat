"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useAuthStore } from "./zustand/useAuthStore";
import dotenv from "dotenv"

dotenv.config();
const Auth = () => {
    const router = useRouter()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { authName, updateAuthName } = useAuthStore();

    const signUpFunc = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`http://localhost:8081/auth/signup`, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });
            console.log(res.data);

            if (res.data.message === "Username already exists :(") {
                alert('Username already exists');
            } else {
                updateAuthName(username);
                router.replace('/chat');
                alert('User registered successfully!');

            }
        } catch (error) {
            console.log("Error in signup function : ", error.message);
        }
    }

    const loginFunc = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`http://localhost:8081/auth/login`, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });
            updateAuthName(username)
            router.replace('/chat')


        } catch (error) {
            console.log("Error in login function : ", error.message);
        }
    }


    return (
        <div className="bg-[#FADEDE] min-h-screen flex flex-col items-center justify-center">
            <img src="logo.png" alt="logo" className="w-full max-w-md mb-6" />
            <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">

                <form className="space-y-6" >
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex">
                        <button
                            type="submit"
                            onClick={signUpFunc}
                            className="m-3 flex w-1/2 justify-center rounded-md bg-[#e89a9a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#efb7b7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                        <button
                            type="submit"
                            onClick={loginFunc}
                            className="m-3 flex w-1/2 justify-center rounded-md bg-[#e89a9a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#efb7b7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth