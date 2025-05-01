import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
// import { getSession } from "@/app/lib/session";
import { z } from "zod";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
            },
        })
        console.log(users);

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}

const userValidate = z.object({
    email: z.string().email().min(3, { message: '*กรุณากรอกหัวข้อ อย่างน้อย 3 ตัวอักษร' }),
    password: z.string().min(3, { message: '*กรุณากรอกรายละเอียด อย่างน้อย 3 ตัวอักษร' }),
});

export async function POST(req: NextRequest) {

    // const session = await getSession();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const validate = userValidate.safeParse(await req.json());
    if (!validate.success) {
        console.log(validate.error.message)
        return NextResponse.json({ message: validate.error.message }, { status: 400 });
    }

    try {
        const user = await req.json();
        const pwHash = await bcrypt.hash(user.password, 10);
        const result = await prisma.user.create({
            data: {
                email: user.email,
                password: pwHash
            }
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}