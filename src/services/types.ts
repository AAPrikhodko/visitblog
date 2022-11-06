import React from "react";

export type Post = {
    id: string,
    image: string,
    likes: number,
    tags: Array<string>,
    text: string,
    publishDate: string,
    owner: {
        id: string,
        title: string,
        firstName: string,
        lastName: string,
        picture: string
    }
}

export interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

export interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}