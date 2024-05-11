import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic';
export async function GET(req,res) {
    try{
        let {searchParams}=new URL(req.url);
        let id=searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.posts.findUnique({
            where: { id: id },
            include: {
                categories: {select: {name:true,}},
                tags:{select:{name:true}}
            }
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}