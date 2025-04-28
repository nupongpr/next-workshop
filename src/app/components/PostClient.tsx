"use client"
import React, { useEffect, useState } from 'react'
import { Post } from '../lib/type';
import Link from 'next/link';
import PostDeleteButton from './PostDeleteButton';

export default function PostClient() {

    const [data, setData] = useState([]);

    async function getData() {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setData(data);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h1 className='text-3xl my-3'>Post Client Page</h1>
            <div>
                <button className='px-4 py-2 border-1 mb-1'>
                    <Link href={'/post-client/create'}>
                        Create Post +
                    </Link>
                </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {data.map((post: Post) => (
                    <div key={post.id} className='px-4 py-6 border-1 flex flex-col'>
                        <h1>{post.id}</h1>
                        <div className='text-end'>
                            <button className='px-2 py-2 border-1 bg-blue-100 cursor-pointer'>
                                <Link href={`/post-client/edit/${post.id}`}>Edit</Link>
                            </button>
                            <PostDeleteButton id={post.id} onDelete={getData}/>
                        </div>
                        <h1 className='text-xl'>{post.title}</h1>
                        <Link href={`/post-client/${post.id}`} className='px-2 py-3 border-1 mt-4'>อ่านเพิ่ม...</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
