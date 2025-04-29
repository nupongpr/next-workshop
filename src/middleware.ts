import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path === "/test") {

        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL + "/post", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}