import { NextResponse } from "next/server";
import {VerifyToken} from "./utility/JWTTokenHelper";
export async function middleware(req, res) {
    try {
        let token=req.cookies.get('token');
        let payload = await VerifyToken(token['value'])
        const requestHeader=new Headers(req.headers);
        requestHeader.set('email',payload['email'])
        requestHeader.set('id', payload['id'])
        requestHeader.set('role', payload['role'])
        if (req.nextUrl.pathname.startsWith("/api/dashboard")) {
            // Assuming 'admin' is the role for the admin user
            if (payload['role'] !== 'admin') {
                return NextResponse.json(
                    { status: "fail", data: "Unauthorized admin" },{ status: 401 }
                );
            }
        } else if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
            if (payload['role'] !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url)) 
            }
        }
        else if (req.nextUrl.pathname.startsWith("/api/userdashboard")) {
            // Assuming 'admin' is the role for the admin user
            if (payload['role'] !== 'user') {
                return NextResponse.json(
                    { status: "fail", data: "Unauthorized user" },{ status: 401 }
                );
            }

        }
        else if (req.nextUrl.pathname.startsWith("/user/dashboard")) {
            if (payload['role'] !== 'user') {
                return NextResponse.redirect(new URL('/', req.url)) 
            }
        }
        return NextResponse.next({request:{headers:requestHeader}})
    } catch (e) {
        if (req.nextUrl.pathname.startsWith("/api/")) {
            return NextResponse.json(
                {status:"fail",data:"Unauthorized"},{status:401}
            )
        }
        else {
            return NextResponse.redirect(new URL('/user/login', req.url)) 
        }
    }
    
    

} 

export const config = {
    matcher: [
        "/admin/dashboard/:path*",
        "/user/dashboard/:path*",
       "/api/dashboard/:path*",
        "/api/userdashboard/:path*",
    ],
}



