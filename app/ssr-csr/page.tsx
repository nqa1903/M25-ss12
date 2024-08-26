// app/ssr-csr/page.tsx
import React from 'react';

// Hàm fetch dữ liệu từ API
async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
}

// Server Component để lấy dữ liệu SSR
export default async function Page() {
  const initialPosts = await fetchPosts(); // Fetch dữ liệu từ API bằng SSR

  return (
    <ClientComponent initialPosts={initialPosts} />
  );
}

// Client Component sử dụng CSR để làm mới dữ liệu
function ClientComponent({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = React.useState(initialPosts); // Khởi tạo state với dữ liệu từ SSR

  // Hàm làm mới dữ liệu bằng CSR
  const refreshPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setPosts(data); // Cập nhật state
  };

  return (
    <div>
      <h1>Danh sách bài viết với Refresh</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <button onClick={refreshPosts}>Refresh</button>
    </div>
  );
}
