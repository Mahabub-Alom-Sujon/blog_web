import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
export async function GET(req,res){
    try {
        const prisma = new PrismaClient();
        let {searchParams}=new URL(req.url);
        let pageNo = parseInt(searchParams.get('pageNo'));
        let perPage = parseInt(searchParams.get('perPage'));
        let searchValue = searchParams.get('searchKey');
        const skipRow = (pageNo - 1) * perPage;
        let result;
        let Total;
        if (searchValue !== "0") {
            Total = await prisma.subscribers.count({
                where: {
                    email: {
                        contains:searchValue
                    }
                }
            })
            result = await prisma.subscribers.findMany({
                where: {
                    email: {
                        contains:searchValue
                    }
                },
                skip: skipRow,
                take:perPage,
            })
        }
        else {
            Total = await prisma.subscribers.count()
            result = await prisma.subscribers.findMany({
                skip: skipRow,
                take:perPage,
            })
        }
        return NextResponse.json({ status: "success", data: {Total, result } })


    }catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function DELETE(req, res) {
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.subscribers.delete({
            where:{id:id},
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}