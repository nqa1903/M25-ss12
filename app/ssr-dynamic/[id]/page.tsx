import React from 'react';

async function fetchPostById(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
        throw new Error('Fail to fetch post');
    }
    const data = await res.json();
    return data;
}

interface PageProps {
    params: { id: string };
}

export default async function Page({ params }: PageProps) {
    const data = await fetchPostById(params.id);

    return (
        <div>
            <h1>Chi tiết bài viết</h1>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </div>
    );
}
