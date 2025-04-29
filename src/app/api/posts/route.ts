import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.post.findMany();

        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const title = body.title as string;
        const content = body.content as string;

        const post = await prisma.post.create({
            data: {
                userId: 1,
                title: title,
                content: content,
            }
        });
        console.log(post);

        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
    }
}