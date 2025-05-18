import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_NEST_URL

export async function POST(request: NextRequest) {
    try {

        const { email, password } = await request.json()

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            throw new Error(`Failed to authenticate Jacob: ${response.status}`)
        }

        const { token, userId } = await response.json()

        // Set token in cookies
        const cookieResponse = NextResponse.json(
            { success: true, userId },
            { status: 200 }
        )

        cookieResponse.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return cookieResponse
    } catch (error) {
        console.error('Error authenticating Jacob:', error);
        return NextResponse.json(
            { error: 'Failed to authenticate Jacob' },
            { status: 500 }
        );
    }
}