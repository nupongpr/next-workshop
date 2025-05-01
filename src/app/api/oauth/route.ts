import prisma from "@/app/lib/db";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const code = request.nextUrl.searchParams.get('code');
        //check if code exists
        if (!code) {

            const redirectUrl = `${process.env.AUTH_URL}
            ?client_id=${process.env.CLIENT_ID}
            &redirect_uri=${process.env.CALLBACK_URL}
            &response_type=code
            &scope=${process.env.SCOPE}`;

            return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
        }

        const token = await getToken(code);
        const userInfo = await getUser(token);
        console.log(userInfo);
        //check if user exists
        const user = await prisma.user.findUnique({
            where: { 
                email: userInfo.cmuitaccount 
            },
            select: {
                id: true,
                email: true,
                role: true
            }
        });
        if (!user) {
            return NextResponse.redirect(new URL("/login?error=Your email is not registered.", request.nextUrl));
        }

        //create session, add user info to session
        await createSession({
            userId: user.id,
            email: user.email,
            role: user.role,
            fullname: userInfo.firstname_EN+" "+userInfo.lastname_EN
        });

        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } catch (error) {
        console.log(error);
    }
}

async function getToken(code: string) {
    const url = process.env.TOKEN_URL as string;
    const params = new URLSearchParams();

    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.CLIENT_ID as string);
    params.append('client_secret', process.env.CLIENT_SECRET as string);
    params.append('redirect_uri', process.env.CALLBACK_URL as string);
    params.append('code', code);
    params.append('scope', process.env.SCOPE as string);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error('Error fetching token:', (error as Error).message);
    }
}

async function getUser(token: string) {

    const accessToken = token; // Replace with your actual access token
    const url = process.env.BASICINFO_URL as string;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        //check if user use CMU email
        console.error('Error fetching basic info:', error);
        return redirect('/login?error=Please+Logout+from+your+Microsoft+personal+account+before+logging+in.');
    }
}