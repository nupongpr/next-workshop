"use client"
import PostClientForm from '@/app/components/PostClientForm';
import { useParams } from 'next/navigation';

export default function PostClientEditPage() {

    const param = useParams();
    const id = Number(param.id);

    return (
        <div>
            <PostClientForm id={id}/>
        </div>
    )
}
