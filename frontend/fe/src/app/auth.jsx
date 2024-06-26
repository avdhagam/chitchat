"use client"

import React, { useState, useEffect } from 'react'

import axios from 'axios'


const Auth
    = () => {

        const [username, setUserName] = useState('');
        const [password, setPassword] = useState('');




        const signUpFunc = async (event) => {
            event.preventDefault();


            try {


                const res = await axios.post('http://localhost:8000/auth/signup', {
                    username: username,
                    password: password
                })
                console.log(res.data)


                if (res.data.message === "Username already exists :(") {
                    alert('Username already exists');

                }
            } catch (error) {
                console.log("Error in signup function : ", error.message);
            }
        }




        return (
            <div>

                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">


                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div className="mt-2">
                                    <input id="username" name="username" type="username" autoComplete="username" value={username} onChange={(e) => setUserName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className='flex'>
                                <button onClick={signUpFunc} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                                <button onClick={signUpFunc} type="submit" className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                            </div>
                        </form>


                    </div>
                </div>


            </div>
        )
    }

export default Auth

