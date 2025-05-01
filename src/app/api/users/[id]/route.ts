import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const users = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                _count:{
                    select: {
                        posts: true
                    }
                },
                posts: true,
            }
        });
        
        return NextResponse.json(users);
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;

        const data = await req.json();
        const email = data.email as string;
        const password = data.password as string;
        
        const users = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: email,
                password: password
            }
        });
        
        return NextResponse.json(users);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        
        const users = await prisma.user.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                email: true
            }
        });
        
        return NextResponse.json(users);
    } catch (error) {
        console.log(error)
    }
}

