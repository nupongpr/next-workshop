import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

const adminRoute = ["/dashboard"];
const superAdminRoute = ["/dashboard/user"];
// const apiRoute = ["/api/users"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = adminRoute.includes(path);
    const isSuperAdminRoute = superAdminRoute.includes(path);
    // const isApiRoute = apiRoute.includes(path);

    const session = await getSession();

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL + "/login?error=Please login to access.", req.nextUrl));
    }

    //check super admin
    if (isSuperAdminRoute && session) {
        if (session.role !== "superadmin") {
            return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL + "/dashboard?error=You are not authorized to access this page.", req.nextUrl));
        }
    }

    // if (isApiRoute && !session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //     // return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL + "/login?error=Please login to access.", req.nextUrl));
    // }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}