import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const id = (await params).id;
        const body = await req.json();
        const title = body.title;
        const content = body.content;

        const post = await prisma.post.update({
            where: {id: parseInt(id)},
            data: {
                title: title,
                content: content
            }
        });
        
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const post = await prisma.post.delete({
            where: {id: parseInt(id)},
        });
        
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
    }
}