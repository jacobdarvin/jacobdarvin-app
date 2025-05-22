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
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const image = formData.get('image') as File;

        const authToken = request.cookies.get('auth-token')?.value;
        let imageUrl = null;

        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('file', image);

            const imageResponse = await fetch(`${API_URL}/blog/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': authToken ? `Bearer ${authToken}` : ''
                },
                body: imageFormData
            });

            if (!imageResponse.ok) {
                const errorText = await imageResponse.text();
                console.error('Image upload failed:', {
                    status: imageResponse.status,
                    statusText: imageResponse.statusText,
                    error: errorText,
                    headers: Object.fromEntries(imageResponse.headers.entries())
                });
                throw new Error(`Failed to upload image: ${imageResponse.status} - ${errorText}`);
            }

            const imageData = await imageResponse.json();
            imageUrl = imageData.url;
        }

        const response = await fetch(`${API_URL}/blog/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken ? `Bearer ${authToken}` : ''
            },
            body: JSON.stringify({ title, content, image: imageUrl })
        });

        if (!response.ok) {
            throw new Error(`Failed to post blog: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Error posting blog:", error);
        return NextResponse.json(
            { error: "Failed to post blog" },
            { status: 500 }
        );
    }
}