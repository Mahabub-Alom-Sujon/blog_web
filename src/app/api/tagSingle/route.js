import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
export const dynamic = 'force-dynamic';
export async function GET(req,res) {
    try {
        const prisma=new PrismaClient();
        let { searchParams } = new URL(req.url);
        let tagID =searchParams.get('id');
        const result = await prisma.posts.findMany({
            where: { tagID: tagID },
            select: {
                id: true,
                img1: true,
                img2: true,
                img3: true,
                img4: true,
                title: true,
                createdAt: true,
                tags: {
                    select:{
                        id: true,
                        name:true
                    }
                }
            }

        })
        return NextResponse.json({ status: "success", data:result })
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}