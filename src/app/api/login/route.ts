import prisma from "@/app/lib/db";
import { createSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        
        const data = await req.json();
        const email = data.email as string;
        const password = data.password as string;

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
            select:{
                id: true,
                email: true,
                role: true,
                password: true
            }
        });

        // console.log(users);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, {status: 404});
        }

        const checkHash = await bcrypt.compare(password, user.password);

        if(!checkHash) {
            return NextResponse.json({ message: "Invalid password" }, {status: 401});
        }

        await createSession({ 
            userId: user.id,
            email: user.email,
            role: user.role
        });

        return NextResponse.json({ message: "You are logged in" }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ messaage: error }, {status: 500});
    }
}