import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_NEST_URL;

export async function GET() {
    try {
        const response = await fetch(`${API_URL}/blog/posts`)

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, content } = await request.json()

        const response = await fetch(`${API_URL}/blog/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })

        if (!response.ok) {
            throw new Error(`Failed to post blog: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json(data)

    } catch (error) {
        console.error("Error posting blog:", error)
        return NextResponse.json(
            { error: "Failed to post blog" },
            { status: 500 }
        )
    }
}