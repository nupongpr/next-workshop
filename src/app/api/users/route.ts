import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany(
            {
                select: {
                    id: true,
                    email: true
                }
            }
        );
        console.log(users);

    } catch (error) {
        console.log(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await req.json();

        const result = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password
            }
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}