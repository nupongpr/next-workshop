import { deleteSession } from "@/app/lib/session"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await deleteSession();

        return NextResponse.json({ message: "You are logged out" }, {status: 200});
        // return NextResponse.redirect(process.env.NEXT_PUBLIC_LOGOUT_URL as string);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, {status: 500});
    }
}