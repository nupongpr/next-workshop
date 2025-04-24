"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
//type

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function PostPage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      const data = await res.json();
      console.log(data);
      setData(data);
    }
    getData();
  }, [])

  return (
    <div>
      <h1 className='text-3xl my-3'>Post Page</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {data.map((post: Post) => (
          <div key={post.id} className='px-4 py-6 border-1 flex flex-col'>
            <h1>{post.id}</h1>
            <h1 className='text-xl'>{post.title}</h1>
            <Link href={`/post-client/${post.id}`} className='px-2 py-3 border-1 mt-4'>อ่านเพิ่ม...</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
