"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { z } from 'zod';

const postValidate = z.object({
    title: z.string().min(3, { message: '*กรุณากรอกหัวข้อ อย่างน้อย 3 ตัวอักษร' }),
    content: z.string().min(3, { message: '*กรุณากรอกรายละเอียด อย่างน้อย 3 ตัวอักษร' }),
});

export default function CreateForm() {

    const router = useRouter();
    const [error, setError] = useState({title: '', content: ''});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const title = data.get('title');
        const content = data.get('content');

        const result = postValidate.safeParse({ title, content });
        if(!result.success) {
            setError({
                title: result.error.formErrors.fieldErrors.title?.[0] || '',
                content: result.error.formErrors.fieldErrors.content?.[0] || '',
            });
            return;
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            router.push('/post');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='text-3xl mt-2'>CreateForm</h1>
            <div>
                <form onSubmit={handleSubmit} className='w-full sm:w-8/12 md:w-6/12 mx-auto'>
                    <div className='mt-2'>
                        <label htmlFor="" className='text-xl'>Title*: </label>
                        <input className='px-4 py-2 border-1 rounded-xl w-full' type="text" name="title" id="title" placeholder='type here...'/>
                    </div>
                    <p className='text-red-500'>{error ? error.title : ''}</p>
                    <div className='mt-2'>
                        <label htmlFor="" className='text-xl'>Content: </label>
                        <textarea className='border-1 px-4 py-6 rounded-xl w-full' name="content" id="content"></textarea>
                    </div>
                    <p className='text-red-500'>{error ? error.content : ''}</p>
                    <div className='flex justify-center mt-2'>
                        <button className='border-1 px-4 py-2 bg-blue-200 rounded-2xl hover:bg-blue-400 cursor-pointer' type='submit'>Submit</button>
                        <button className='border-1 px-4 py-2 ms-2 bg-red-200 rounded-2xl hover:bg-red-400 cursor-pointer'>
                            <Link href={'/post'}>Cancel</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
