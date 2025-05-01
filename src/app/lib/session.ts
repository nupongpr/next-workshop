import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// type SessionPayload = {
//     userId: number;
//     name: string;
//     email: string;
//     expiresAt: Date;
// }

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('workshop-session')
    const payload = await decrypt(session?.value)
    return payload;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    if (!session) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session', error)
        return null
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createSession(user: any) {
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000)// 8 hours
    const session = await encrypt(user)
    const cookieStore = await cookies()

    cookieStore.set('workshop-session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('workshop-session')
}