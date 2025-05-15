import { NextResponse } from 'next/server';

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
