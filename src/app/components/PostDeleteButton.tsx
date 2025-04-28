"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function PostDeleteButton({ id }: { id: number }) {

    const router = useRouter();

    async function handleDelete() {
        if (!confirm('คุณแน่ใจหรือไม่')) {
            return;
        }
        try {
            
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete post');
            }

            toast.success("ลบข้อมูลสําเร็จ id = " + id);
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <button className='ms-1 py-2 px-2 border-1 bg-red-100 cursor-pointer' onClick={handleDelete}>Del</button>
        </>
    )
}
