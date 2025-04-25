"use client"
import { Post } from '@/app/lib/type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function PostById() {

    const [data, setData] = useState<Post | null>(null);

    const param = useParams();
    const id = param.id;
    console.log(id);

    useEffect(() => {
        try {
            async function getData() {
                const res = await fetch(`/api/posts/${id}`);
                const data = await res.json();
                // console.log(data);
                setData(data);
            }
            getData();
        } catch (error) {
            console.log(error)
        }
    }, [id])

    return (
        <div>
            <h1 className='text-3xl'>Post ID is {id}</h1>
            {
                data &&
                (
                    <div className='p-2 w-8/10 mx-auto mt-2 border-1'>
                        <h1 className='text-3xl'>{data.title}</h1>
                        <p className='mt-4'>
                            {data.content}
                        </p>
                    </div>
                )
            }
        </div>
    )
}
