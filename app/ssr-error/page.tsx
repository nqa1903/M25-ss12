// app/ssr-error/page.tsx
import React from 'react';

// Hàm fetch dữ liệu giả lập lỗi
async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/nonexistent-url");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, message: "Xẩy ra lỗi khi lấy dữ liệu" };
  }
}

export default async function Page() {
  const { data: posts, error } = await fetchPosts(); 

  return (
    <div>
      <h1>Xử lý Lỗi với SSR</h1>
      {error ? (
        <p>{error}</p> 
      ) : (
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
