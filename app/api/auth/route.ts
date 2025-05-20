import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const userId = userCredential.user.uid;

        const cookieResponse = NextResponse.json(
            { success: true, userId },
            { status: 200 }
        );

        cookieResponse.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return cookieResponse;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json(
            { error: 'Failed to authenticate user' },
            { status: 401 }
        );
    }
}