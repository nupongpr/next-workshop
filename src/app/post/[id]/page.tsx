import React from 'react'

async function getDataById(id: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.json();
}

export default async function PostById({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    const data = await getDataById(id);
    console.log(data);

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
