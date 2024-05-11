import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
export async function POST(req,res) {
    try{
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result = await prisma.categories.create({
            data:reqBody
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function GET(req,res){
    try {
        const prisma = new PrismaClient();
        let {searchParams}=new URL(req.url);
        let pageNo =parseInt(searchParams.get('pageNo'));
        let perPage =parseInt(searchParams.get('perPage'));
        let searchValue = searchParams.get('searchKey');
        const skipRow = (pageNo - 1) * perPage;
        let result;
        let Total;
        if (searchValue !== "0") {
            Total = await prisma.categories.count({
                where: {
                    name: {
                        contains:searchValue
                    }
                }
            })
            result = await prisma.categories.findMany({
                where: {
                    name: {
                        contains:searchValue
                    }
                },
                skip: skipRow,
                take:perPage,
            })
        }
        else {
            Total = await prisma.categories.count()
            result = await prisma.categories.findMany({
                skip: skipRow,
                take:perPage,
            })
        }
        return NextResponse.json({ status: "success", data: {Total, result } })
    }catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function PUT(req, res) {
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.categories.findMany({
            where:{id:id},
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function PATCH(req, res) {
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result=await prisma.categories.update({
            where:{id:id},
            data:reqBody
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function DELETE(req, res) {
    try {
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.categories.delete({
            where:{id:id},
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}