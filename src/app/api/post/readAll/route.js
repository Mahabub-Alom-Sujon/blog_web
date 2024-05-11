import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
export async function GET(req,res) {
    try{
        const prisma=new PrismaClient();
        const result = await prisma.posts.findMany({
            include: {
                categories: {
                    select:{
                        name:true
                    }
                },
                tags: {
                    select: {
                        name:true
                    }
                }
            }
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}