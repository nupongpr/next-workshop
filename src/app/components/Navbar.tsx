"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {

    const pathname = usePathname();

    return (
        <div>
            <nav className="border-1 p-6 mx-2 mt-2">
                <div>
                    <h1 className="text-3xl">Workshop</h1>
                </div>
                <div className="mt-3">
                    <h3><Link href={'/'} className={pathname == '/' ? 'text-blue-500' : ''}>Home</Link></h3>
                    <h3><Link href={'/post'} className={pathname == '/post' ? 'text-blue-500' : ''}>Post</Link></h3>
                    <h3>
                        <Link href={'/about'} className={pathname == '/about' ? 'text-blue-500' : ''}>About</Link>
                    </h3>
                </div>
                <div>
                    <Image className="mt-3"
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        width={300}
                        height={300}
                        alt="shoe"
                    />
                </div>
            </nav>
        </div>
    )
}
