"use client"
import React, { useState } from 'react'
import { Post } from '../lib/type'
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const postValidate = z.object({
    title: z.string().min(3, { message: '*กรุณากรอกหัวข้อ อย่างน้อย 3 ตัวอักษร' }),
    content: z.string().min(3, { message: '*กรุณากรอกรายละเอียด อย่างน้อย 3 ตัวอักษร' }),
});

export default function PostEditForm({ data }: { data: Post }) {

    const id = data.id;
    const router = useRouter();
    const [error, setError] = useState({ title: '', content: '' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const title = data.get('title');
        const content = data.get('content');
        console.log(title, content);

        const result = postValidate.safeParse({ title, content });
        if (!result.success) {
            setError({
                title: result.error.formErrors.fieldErrors.title?.[0] || '',
                content: result.error.formErrors.fieldErrors.content?.[0] || '',
            });
            return;
        }

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            const result = await res.json();
            console.log(result);

            if (!res.ok) {
                throw new Error(result.message);
            }
            toast.success('แก้ไขข้อมูลเรียบร้อย');
            router.push('/post');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-full sm:w-8/12 md:w-6/12 mx-auto'>
                <div className='mt-2'>
                    <label htmlFor="" className='text-xl'>Title*: </label>
                    <input className='px-4 py-2 border-1 rounded-xl w-full' type="text" name="title" id="title" placeholder='type here...'
                        defaultValue={data.title}
                    />
                </div>
                <p className='text-red-500'>{error ? error.title : ''}</p>
                <div className='mt-2'>
                    <label htmlFor="" className='text-xl'>Content: </label>
                    <textarea className='border-1 px-4 py-6 rounded-xl w-full' name="content" id="content"
                        defaultValue={data.content ?? ''}></textarea>
                </div>
                <p className='text-red-500'>{error ? error.content : ''}</p>
                <div className='flex justify-center mt-2'>
                    <button className='border-1 px-4 py-2 bg-blue-200 rounded-2xl hover:bg-blue-400 cursor-pointer' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
