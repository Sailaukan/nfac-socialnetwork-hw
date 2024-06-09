'use client'

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/PostContext';

interface User {
    name: string;
    email: string;
    password: string;
    token: string;
}

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(false)
    const [useEffectTrigger, setUseEffectTrigger] = useState(0)

    const [newUser, setNewUser] = useState<User>({ name: '', email: '', password: '', token: '' });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, name: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, password: event.target.value });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        getToken()
        setUseEffectTrigger(useEffectTrigger + 1);

        setUser({
            ...user,
            name: newUser.name,
            password: newUser.password,
        })
        console.log(newUser.token);
    };

    const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isAuth', 'false')
        };

        setUseEffectTrigger(useEffectTrigger + 1);
    };

    const getToken = () => {
        axios.post('https://dummyjson.com/auth/login', {
            username: newUser.name,
            password: newUser.password,
            expiresInMins: 30
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                setNewUser({ ...newUser, token: response.data.token });
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isAuth', 'true');
                };
                setError(false)
            })
            .catch(error => {
                console.log(error);
                setError(true)
            });
    }

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');

            if (token) {
                setUser({ ...user, token, isAuth: true });
            }
        }
    }, [useEffectTrigger]);

    if ((localStorage.getItem('isAuth') === 'true') && (typeof window !== 'undefined')) {
        return (
            <center>
                <div className={`${user.darkTheme ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-8 w-full max-w-md animate-fade-in`}>
                    <div className="flex flex-col items-center mb-6">
                        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mb-4 animate-bounce">
                            <img className="aspect-square h-full w-full" alt="User Avatar" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
                        </span>
                        <h1 className={`text-3xl font-bold ${!user.darkTheme ? 'text-gray-800' : 'text-white'} animate-fade-in-up`}>@{user.name}</h1>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleSignOut} className={`${!user.darkTheme ? 'bg-black text-white' : 'bg-white text-black'} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2`}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </center>
        )
    }

    else if ((!localStorage.getItem('isAuth') || localStorage.getItem('isAuth') === 'false')&& (typeof window !== 'undefined') ) return (
        <center>
            <div className={`flex flex-col w-full max-w-md px-4 py-8 ${user.darkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow sm:px-6 md:px-8 lg:px-10`}>
                <p className={` ${user.darkTheme ? 'text-white' : 'text-black'} self-center mt-4  `}>
                    Login To Your Account
                </p>
                <div className="mt-4">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input
                                    onChange={handleNameChange} type="text" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your username" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input onChange={handlePasswordChange} type="password" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password" />
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                        </div>
                        <div className="flex w-full">
                            <button onClick={handleSubmit} className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                Login
                            </button>
                        </div>
                    </form>
                    {error ?
                        <div className="text-white">
                            Wrong username or password
                        </div>
                        :
                        null}
                </div>
            </div>
        </center>
    );
}

export default Login;