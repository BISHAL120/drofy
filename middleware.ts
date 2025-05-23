import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {

    const session = await auth();
    const user = session?.user;

    console.log(user)


    // Get the pathname from the URL
    const { pathname } = request.nextUrl;

    /* if (pathname === '/login') {
        if (user) {
            return NextResponse.redirect(new URL('/store', request.url));
        }
    } */

    // Redirect from root path to /home
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