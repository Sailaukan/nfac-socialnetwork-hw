'use client'

import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import axiosInstance from '../lib/axios';
import { PostType } from '../type/post';
import { UserContext } from '../contexts/PostContext';
import { UserPost } from '../components/UserPost';


interface AuthResponse {
    id: number;
    username: string;
    email: string;
}

interface UserPostType {
    title: string
    username: string
}


function PostsList() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [userPosts, setUserPosts] = useState<UserPostType[]>([]);
    const [error, setError] = useState<any | null>(null);
    const { user, setUser } = useContext(UserContext);
    const [newPost, setNewPost] = useState<string | null>("")

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/posts');
                setPosts(response.data.posts);
            } catch (error) {
                setError('An error occurred while fetching posts.');
            }
        };
        fetchPosts();
    }, [posts]);


    //HERE IS THE INTERCEPTOR EXAMPLE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get<AuthResponse>('/auth/me');
                console.log(response.data);
                if (response.data) {
                    setUser({
                        ...user,
                        name: response.data.username,
                        isAuth: true,
                        id: response.data.id
                    });
                }
            }
            catch (error) {
                console.log(user.token);
                setError(error)
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost(event.target.value);
    };

    const publishPost = async () => {
        try {
            const response = await axiosInstance.post('/posts/add', {
                title: newPost,
                userId: user.id,
            });
            const result = response.data;
            console.log(result);

            setUserPosts([result, ...userPosts]);

            setNewPost("");
        } catch (error) {
            console.error('Error publishing post:', error);
            setError('An error occurred while publishing the post.');
        }
    };

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

            <div className={`${!user.darkTheme ? 'bg-white' : 'bg-gray-800'} rounded-xl mb-8 shadow-lg p-6 max-w-md mx-auto`}>
                <div className="flex flex-col gap-4">

                    <p className='text-gray-400'>@{user.name}</p>
                    <div>
                        <textarea
                            onChange={handleNameChange}
                            className="flex min-h-[80px] bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full resize-none rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="What's on your mind?"
                        ></textarea>
                    </div>
                    <div className="flex justify-right">
                        <button onClick={publishPost} className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl">
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userPosts && userPosts.map(post => (
                    <UserPost
                        title={post.title}
                    />
                ))}
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
