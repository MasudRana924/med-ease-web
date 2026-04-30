import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // Validate the secret token for security
    const secret = request.headers.get('x-revalidate-secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    try {
        // Get paths from request body
        const body = await request.json();
        const paths = body.paths || ['/nurses']; // Default to nurses if no paths provided

        // Revalidate each path
        paths.forEach((path: string) => {
            revalidatePath(path);
        });

        return NextResponse.json({ message: 'Revalidated successfully', paths }, { status: 200 });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
    }
}