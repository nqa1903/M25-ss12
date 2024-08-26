"use client";
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await res.json();
      setData(result); 
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Danh sách người dùng (CSR)</h1>
      <ul>
        {data?.map((user: any) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
