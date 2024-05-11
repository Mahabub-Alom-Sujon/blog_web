import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {headers} from "next/headers";
export async function POST(req,res) {
    try{
        let headerList=headers();
        let id=headerList.get('id');

        let reqBody=await req.json();
        reqBody.userID=id;

        const prisma=new PrismaClient();
        const result=await prisma.comments.create({
            data:reqBody
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}

export async function GET(req,res) {
    try {
        const prisma=new PrismaClient();
        let headerList=headers();
        let id=headerList.get('id');
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
                    userID: id,
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
            result= await prisma.comments.findMany({
                where: {
                    userID: id,
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
                    }
                },
                skip: skipRow,
                take: perPage
            })
        }
        else {

            Total = await prisma.comments.count({
                where: {
                    userID: id,
                }
            })
            result= await prisma.comments.findMany({
                where: {
                    userID: id,
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
                    }
                },
                skip: skipRow,
                take: perPage
            })
        }
       
        return NextResponse.json({ status: "success", data: {Total,result } })
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}

export async function DELETE(req, res) {
    try {
        let headerList = headers();
        let user_id =headerList.get('id');
        let reqBody = await req.json();
        const prisma = new PrismaClient();
        const result = await prisma.comments.deleteMany({
            where: {
                AND: [
                    { userID: user_id },
                    { id:reqBody['id']},
                ],
            },
        })
        return NextResponse.json({ status: "success", data: result })
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e.toString()})
    }
}