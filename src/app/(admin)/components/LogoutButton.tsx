"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function LogoutButton() {

    const router = useRouter();
    const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL;

    async function handleLogout() {
        try {
            const res = await fetch('/api/logout');
            const result = await res.json();
            console.log(result);

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success("Logout Success !!!");
            router.push(logoutUrl as string);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/* Normal Logout */}
            <button className="px-4 py-2 border-1 bg-red-100 mt-2 cursor-pointer me-2"
                onClick={handleLogout}
            >Logout</button>
            {/* Logout CMU */}
            <a href={`/api/logout`}
                className="px-4 py-2 border-1 bg-red-300 mt-2">
                Logout CMU
            </a>
        </div>
    )
}
