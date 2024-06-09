'use client'

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/PostContext";
import axiosInstance from "../lib/axios";

interface AuthResponse {
    id: number;
    username: string;
    email: string;
}

export const UserPost = (props: { title: string }) => {
    const { user } = useContext(UserContext)
    const [userName, setUsername] = useState<string | null>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<AuthResponse>('/auth/me');
                setUsername(response.data.username);
            }
            catch (error) {
                console.log(user.token);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-6 py-2">
            <div className={`rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 ${user.darkTheme ? 'bg-gray-800' : 'bg-white'}`} data-v0-t="card">
                <div className="flex items-start gap-4">
                    <div className="grid gap-2 flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${user.darkTheme ? 'text-white' : 'text-black'}`}>{props.title}</h3>
                        </div>
                        <p className={`${user.darkTheme ? 'text-white' : 'text-black'} opacity-40`}>
                            @{userName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}