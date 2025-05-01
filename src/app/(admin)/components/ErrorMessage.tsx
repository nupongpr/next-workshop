"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ErrorMessage() {

    const searchParams = useSearchParams()
    const error = searchParams.get('error');

    return (
        <div>
            <p className='text-red-500 mt-4'>{error}</p>
        </div>
    )
}
