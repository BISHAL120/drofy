import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {

    const session = await auth();
    const user = session?.user;


    // Get the pathname from the URL
    const { pathname } = request.nextUrl;

    // Redirect from root path to /home
    if (pathname === '/demo') {
        if (user?.phone !== "01312604691") {
            return NextResponse.redirect(new URL('/store', request.url));
        }
    }

    // Continue with the request for all other routes
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (e.g. robots.txt)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};