import React from 'react'

async function getDataById(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default async function PostById({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    const data = await getDataById(id);

    return (
        <div>
            <h1 className='text-3xl'>Post ID is {id}</h1>
            <div className='p-2 w-8/10 mx-auto mt-2 border-1'>
                <h1 className='text-3xl'>{data.title}</h1>
                <p className='mt-4'>
                    {data.content}
                </p>
            </div>
        </div>
    )
}
