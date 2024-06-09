'use client'

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/PostContext";
import axiosInstance from "../lib/axios";

interface AuthResponse {
    id: number;
    username: string;
    email: string;
}

interface UserPostProps {
    title: string;
    userPosts: UserPostType[];
    setUserPosts: React.Dispatch<React.SetStateAction<UserPostType[]>>;
}

interface UserPostType {
    title: string;
    username: string;
}

const UserPost: React.FC<UserPostProps> = ({ title, userPosts, setUserPosts }) => {
    const { user } = useContext(UserContext)
    const [userName, setUsername] = useState<string | null>()
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

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

    const deleteUserPost = (titleToDelete: string) => {
        const newUserPosts = userPosts.filter(post => post.title !== titleToDelete);
        setUserPosts(newUserPosts);
    };

    const handleDeleteClick = (titleToDelete: string) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            deleteUserPost(titleToDelete);
        };
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const updatedUserPosts = userPosts.map(post => 
            post.title === title ? { ...post, title: newTitle } : post
        );
        setUserPosts(updatedUserPosts);
        setIsEditing(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(event.target.value);
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-2">
            <div className={`rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 ${user.darkTheme ? 'bg-gray-800' : 'bg-white'}`} data-v0-t="card">
                <div className="flex items-start gap-4">
                    <div className="grid gap-2 flex-1">
                        <div className="flex items-center justify-between">
                            {isEditing ? (
                                <textarea
                                    className="w-full p-2 border rounded"
                                    value={newTitle}
                                    onChange={handleTitleChange}
                                />
                            ) : (
                                <h3 className={`font-semibold ${user.darkTheme ? 'text-white' : 'text-black'}`}>{title}</h3>
                            )}
                        </div>
                        <p className={`${user.darkTheme ? 'text-white' : 'text-black'} opacity-40`}>
                            @{userName}
                        </p>
                        <div className="flex items-center gap-4">
                            {isEditing ? (
                                <button onClick={handleSaveClick} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4"
                                    >
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                    <span>Save</span>
                                </button>
                            ) : (
                                <button onClick={handleEditClick} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4"
                                    >
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19H4v-3L16.5 3.5z" />
                                    </svg>
                                    <span>Edit</span>
                                </button>
                            )}
                            <button onClick={handleDeleteClick(title)} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-2 14H7L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M5 6l1-3h12l1 3" />
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserPost;