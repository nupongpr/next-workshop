import PostEditForm from '@/app/components/PostEditForm';
import React from 'react'

async function getDataById(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export default async function EditPageById({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;
    const data = await getDataById(id);
    console.log(data);

    return (
        <>
            <h1 className='text-3xl mt-2'>Edit Form</h1>
            <div>
                <PostEditForm data={data}/>
            </div>
        </>
    )
}
