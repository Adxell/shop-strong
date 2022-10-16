import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest| any) {
    // try {
    //     await jose.jwtVerify( req.cookies.get('token') as string,
    //          new TextEncoder().encode(process.env.JWT_SECRET_SEED)
    //         )

    //         return NextResponse.next()
    // } catch( error ) {
    //     return NextResponse.redirect(`http://localhost:3000/auth/login?p=${req.nextUrl.pathname}`)
    // }

    // const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
        const { protocol, host, pathname } = req.nextUrl;
        return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
    }


    return NextResponse.next()

}

// export default withAuth(
//     function middleware ( req: NextRequest){
//         console.log("middleware")
//         return NextResponse.redirect(`http://localhost:3000/auth/login?p=${req.nextUrl.pathname}`)
//     }
// )

export const config = {
    matcher: ['/checkout/:path*'],
}