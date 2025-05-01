"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function LoginForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        // console.log(email, password);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();
            // console.log(result);

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success("Login Success !!!");
            router.push('/dashboard');
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message);
        }
    }

    return (
        <div>
            <form className='mt-4 border-1 px-4 py-6' onSubmit={handleLogin}>
                <div className='mt-2'>
                    <label htmlFor="">Email: </label>
                    <input className='border-1 w-full' type="email" name='email' required />
                </div>
                <div className='mt-2'>
                    <label htmlFor="">Password: </label>
                    <input className='border-1 w-full' type="password" name='password' required />
                </div>
                <p className='text-red-500 mt-2 animate-bounce'>{error}</p>
                <div className='mt-4 text-center'>
                    <button className='px-4 py-2 border-1 cursor-pointer'>Submit</button>
                </div>
            </form>
            <div className='mt-4 text-center'>
                <a href={`${process.env.NEXT_PUBLIC_URL}/api/oauth`}
                    className='px-4 py-2 border-1 cursor-pointer rounded-xl bg-purple-300'>
                    Login CMU
                </a>
            </div>
        </div>
    )
}
