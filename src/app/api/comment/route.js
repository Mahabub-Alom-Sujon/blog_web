import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic';
export async function GET(req,res) {
    try{
        const prisma=new PrismaClient();
        let {searchParams}=new URL(req.url);
        let postID=searchParams.get('postID');

        const result=await prisma.comments.findMany({
            where: { postID: postID },
            select: {
                id: true,
                userID: true,
                postID: true,
                descriptions:true,
                users: {
                    select: {
                        firstName: true,
                        lastName: true,
                        photo:true
                    }
                }
            },
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}
