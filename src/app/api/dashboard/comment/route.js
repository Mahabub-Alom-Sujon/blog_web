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
            Total = await prisma.comments.count({
                where: {
                    OR: [
                        {
                            descriptions: {
                                contains:searchValue
                            }
                        },
                        {
                            posts: {
                                title: {
                                    contains:searchValue
                                }
                            }
                        }
                    ]
                }
            })
            result = await prisma.comments.findMany({
                where: {
                    OR: [
                        {
                            descriptions: {
                                contains:searchValue
                            }
                        },
                        {
                            posts: {
                                title: {
                                    contains:searchValue
                                }
                            }
                        }
                    ]
                },
                include: {
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            img1: true,
                            img2: true,
                            img3: true,
                            img4:true,
                        }
                    },
                    users: {
                        select: {
                            firstName: true,
                            lastName:true,
                        }
                    }
                },
                skip: skipRow,
                take:perPage,
            })
        }
        else {
            Total = await prisma.comments.count()
            result = await prisma.comments.findMany({
                include: {
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            img1: true,
                            img2: true,
                            img3: true,
                            img4:true,
                        }
                    },
                    users: {
                        select: {
                            firstName: true,
                            lastName:true,
                        }
                    }
                },
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
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result=await prisma.comments.update({
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
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.comments.delete({
            where:{id:id},
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}