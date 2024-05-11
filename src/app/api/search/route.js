import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic';
export async function GET(req,res) {
    try {
        const prisma=new PrismaClient();
        let {searchParams}=new URL(req.url);
        let keyword= searchParams.get('keyword');
        const result = await prisma.posts.findMany({
            where: {
                OR: [
                    { title: { contains: keyword } },
                    { short_des: { contains: keyword } },
                    { keywords: { contains: keyword } },
                    { long_des: { contains: keyword } },
                    {type:{contains:keyword} },
                    { categories: { name: { contains: keyword } } },
                    {tags:{name:{contains:keyword} } }
                ]
            },
            include: {
                categories: { select: { name: true } },
                tags:{select:{name:true} }
            
            }
        })
        return NextResponse.json({ status: "success", data: result })
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}