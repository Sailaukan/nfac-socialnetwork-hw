'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostType } from '@/app/type/post';


const PostPage = () => {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<PostType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://dummyjson.com/posts/${id}`)
                .then(response => {
                    setPost(response.data);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
        else {
            console.log("There is no ID")
        }
    });


    useEffect(() => {
        if (id) {
            axios.get(`https://dummyjson.com/posts/${id}`)
                .then(response => setPost(response.data))
                .catch(error => console.error('Error fetching posts:', error));
        }
    }, []);


    if (error) {
        return (
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
        );
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#9333ea] via-[#4f46e5] to-[#2563eb] animate-gradient-x">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg animate-spin">
                    <div className="w-10 h-10 bg-white rounded-full shadow-inner animate-pulse"></div>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="prose prose-stone dark:prose-invert">
                <div className="bg-gradient-to-r from-[#4c51bf] to-[#6b46c1] rounded-lg p-6 mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="M7 10v12"></path>
                                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                            </svg>
                            <span>{post.reactions.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="M17 14V2"></path>
                                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                            </svg>
                            <span>{post.reactions.dislikes}</span>
                        </div>
                    </div>
                </div>
                <p>{post.body}</p>
                <div
                    className="flex flex-wrap gap-2 mt-6"
                >
                    {post.tags.map((tag, index) => (

                        <a key={index} className="bg-gradient-to-r from-[#4c51bf] to-[#6b46c1] text-white px-3 py-1 rounded-full text-sm hover:bg-gradient-to-r hover:from-[#4c51bf]/90 hover:to-[#6b46c1]/90 transition-colors">
                            {tag}
                        </a>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default PostPage;
