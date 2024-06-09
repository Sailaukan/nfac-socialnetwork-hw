'use client'

export interface Reaction {
    likes: number;
    dislikes: number;
}

export interface PostType {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: Reaction;
    tags: string[];
}