import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../contexts/PostContext';

interface IPost {
    title: string,
    body: string,
    views: number,
    likes: number,
    dislikes: number,
    path: string,
    tags: string[],
}

function Post({ title, views, likes, dislikes, tags, path }: IPost) {

    const { user, setUser } = useContext(UserContext);

    return (
        <Link href={path}>
            <div className="container mx-auto px-4 md:px-6 py-2">
                <div className={`rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 ${user.darkTheme ? 'bg-gray-800' : 'bg-white'}`} data-v0-t="card">
                    <div className="flex items-start gap-4">
                        <div className="grid gap-2 flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className={`font-semibold ${user.darkTheme ? 'text-white' : 'text-black'}`}>{title}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
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
                                        className="w-4 h-4"
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                    <span>{likes}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
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
                                        className="w-4 h-4"
                                    >
                                        <path d="M17 14V2"></path>
                                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                                    </svg>
                                    <span>{dislikes}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
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
                                        className="w-4 h-4"
                                    >
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <span>{views}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className={`${user.darkTheme ? 'text-white' : 'text-black'} inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`}
                                        data-v0-t="badge"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Post;