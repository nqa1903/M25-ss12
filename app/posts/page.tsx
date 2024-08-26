import React from "react";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Fail to fetch posts");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await fetchPosts();
  return (
    <div>
      <h1>Danh sách bài viết SSR</h1>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
