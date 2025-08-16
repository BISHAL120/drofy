import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

const protectedPaths = [
    '/store',
    '/store/*',
    '/admin',
    '/admin/*',
]

export async function middleware(request: NextRequest) {
    const session = await auth();
    const user = session?.user;

    // Get the pathname from the URL
    const { pathname } = request.nextUrl;

    // Check if path requires authentication
    const requiresAuth = protectedPaths.some((path) => {
        // Convert wildcard pattern to regex
        const pattern = path.replace('*', '.*');
        return new RegExp(`^${pattern}$`).test(pathname);
    });

    const protectedApiRouts = [
        '/api/store',
        '/api/admin',
        '/api/steadFast',
    ]

    /* TODO: Implement Bearer Token Authentication */
    // Protect API routes
    if (protectedApiRouts.includes(pathname)) {
        if (!user || !user.isActive) {
            return new NextResponse(
                JSON.stringify({ message: 'Access Denied. Authentication required or account is inactive.' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    }

    // Redirect to login if authentication is required but user is not logged in
    if (requiresAuth && !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/admin') || pathname.match(/^\/admin\/.*$/)) {
        if (!user?.role?.includes("ADMIN")) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname === '/login') {
        if (user) {
            return NextResponse.redirect(new URL('/store', request.url));
        }
    }

    if (pathname === '/demo') {
        if (user?.phone !== "01312604691") {
            return NextResponse.redirect(new URL('/store', request.url));
        }
    }

    // Continue with the request for all other routes
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};