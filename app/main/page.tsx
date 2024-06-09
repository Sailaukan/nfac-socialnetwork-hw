'use client'

import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import { PostType } from '../type/post';
import { UserContext } from '../contexts/PostContext';


interface AuthResponse {
    id: number;
    username: string;
    email: string;
}

// {localStorage.getItem('token')}

function PostsList() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
            .then(response => setPosts(response.data.posts))
            .catch(error => setError(error));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<AuthResponse>('https://dummyjson.com/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                console.log(response.data);
                if (response.data) {
                    setUser({
                        ...user,
                        isAuth: true
                    })
                }
            }
            catch (error) {
                console.log(user.token)
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if ({ error }) {
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#EC4899] p-4">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-8xl">404</h1>
                <p className="max-w-md text-center text-lg font-medium text-white/90 sm:text-xl">
                    {error}
                </p>
                <Link
                    href="/main"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366F1]"
                    prefetch={false}
                >
                    Take me home
                </Link>
            </div>
        </div>
    }

    if (!localStorage.getItem('isAuth') || localStorage.getItem('isAuth') === 'false') {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-[#6366F1] to-[#EC4899] p-4">
                <div className="rounded-lg bg-white/80 p-6 backdrop-blur-sm dark:bg-gray-900/80">
                    <h1 className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-3xl font-bold text-transparent">
                        To see posts, please
                        <a href="/profile" className='text-white hover:opacity-60'> Sign In</a>
                    </h1>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-2 lg:py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts && posts.map(post => (
                    <Post
                        key={post.id}
                        title={post.title}
                        body={post.body}
                        views={post.views}
                        likes={post.reactions.likes}
                        dislikes={post.reactions.dislikes}
                        tags={post.tags}
                        path={`/posts/${post.id}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default PostsList;
