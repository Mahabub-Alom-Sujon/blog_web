import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
export async function POST(req,res) {
    try{
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result = await prisma.posts.create({
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
        const prisma=new PrismaClient();
        let {searchParams}=new URL(req.url);
        let pageNo = parseInt(searchParams.get('pageNo'));
        let perPage = parseInt(searchParams.get('perPage'));
        let searchValue = searchParams.get('searchKey');
        const skipRow = (pageNo - 1) * perPage;
        let result;
        let Total;
        if (searchValue !== "0") {
            Total = await prisma.posts.count({
                where: {
                    OR: [
                        {
                            title: {
                                contains:searchValue
                            }
                        },
                        {
                            keywords: {
                                contains:searchValue
                            }
                        },
                        {
                            type: {
                                contains:searchValue
                            }
                        },
                        {
                            categories: {
                                name: {
                                    contains:searchValue
                                }
                            }
                        },
                        {
                            tags: {
                                name: {
                                    contains:searchValue
                                }
                            }
                        }

                    ]
                    
                }
            })
            result = await prisma.posts.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains:searchValue
                            }
                        },
                        {
                            keywords: {
                                contains:searchValue
                            }
                        },
                        {
                            type: {
                                contains:searchValue
                            }
                        },
                        {
                            categories: {
                                name: {
                                    contains:searchValue
                                }
                            }
                        },
                        {
                            tags: {
                                name: {
                                    contains:searchValue
                                }
                            }
                        }

                    ]
                    
                },
                select: {
                    id:true,
                    title: true,
                    img1: true,
                    img2: true,
                    img3: true,
                    img4: true,
                    keywords: true,
                    type: true,
                    createdAt:true,
                    categories: {
                        select: {
                            name:true,
                        }
                    },
                    tags: {
                        select: {
                            name:true,
                        }
                    }
                },
                skip: skipRow,
                take: perPage
            })
        } else {
            Total = await prisma.posts.count();
            result = await prisma.posts.findMany({
                select: {
                    id:true,
                    title: true,
                    img1: true,
                    img2: true,
                    img3: true,
                    img4: true,
                    keywords: true,
                    type: true,
                    createdAt:true,
                    categories: {
                        select: {
                            name:true,
                        }
                    },
                    tags: {
                        select: {
                            name:true,
                        }
                    }
                },
                skip: skipRow,
                take: perPage,
            })
        }
        return NextResponse.json({ status: "success", data: { Total, result } })
    }catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}

export async function PUT(req, res) {
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.posts.findMany({
            where: { id: id },
            include: {
                categories: {
                    select: {
                        id: true,
                        name:true
                    }
                },
                tags: {
                    select: {
                        id: true,
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
export async function PATCH(req, res) {
    try{
        let { searchParams } = new URL(req.url);
        let id =searchParams.get('id');
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result=await prisma.posts.update({
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
        const result=await prisma.posts.delete({
            where:{id:id},
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}