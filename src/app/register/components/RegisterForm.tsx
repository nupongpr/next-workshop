"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function RegisterForm() {

  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        toast.error(result.message);
        throw new Error(result.message);
      }

      router.push('/login');
      toast.success("สมัครสมาชิกสําเร็จ");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className='mt-4 border-1 px-4 py-6' onSubmit={(handleRegister)}>
        <div className='mt-2'>
          <label htmlFor="">Email: </label>
          <input className='border-1 w-full' type="email" name='email'/>
        </div>
        <div className='mt-2'>
          <label htmlFor="">Password: </label>
          <input className='border-1 w-full' type="password" name='password'/>
        </div>
        <div className='mt-4 text-center'>
          <button className='px-4 py-2 border-1 cursor-pointer'>Submit</button>
        </div>
      </form>
    </div>
  )
}
