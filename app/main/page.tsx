'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import { PostType } from '../type/post';

function PostsList() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
            .then(response => setPosts(response.data.posts))
            .catch(error => setError(error));
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
