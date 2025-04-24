"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface PostData {
    userId: number
    id: number
    title: string
    body: string
}

export default function PostById() {

    const [data, setData] = useState<PostData | null>(null);

    const param = useParams();
    const id = param.id;
    console.log(id);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
            const data = await res.json();
            console.log(data);
            setData(data);
        }
        getData();
    }, [id])

    if (!data) {
        return 'Data Not Found.';
    }

    return (
        <div>
            <h1 className='text-3xl'>Post ID is {id}</h1>
            <div className='p-2 w-8/10 mx-auto mt-2 border-1'>
                <h1 className='text-3xl'>{data.title}</h1>
                <p className='mt-4'>
                    {data.body}
                </p>
            </div>
        </div>
    )
}
