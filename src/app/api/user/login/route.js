import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {CreateToken} from "@/utility/JWTTokenHelper";

export async function POST(req,res) {
    try{
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        
        const result=await prisma.users.findUnique({where:reqBody})

        if(result.length===0){
            return  NextResponse.json({status:"fail",data:result})
        }
        else if(result.role === "user"){
            let token=await CreateToken(result['email'],result['id'],result['role']);
            let expireDuration=new Date(Date.now() +7*24*60*60*1000 );
            const cookieString=`token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;
            return NextResponse.json({ status: "success", data: { token,role:result.role } },{status:200,headers:{'set-cookie':cookieString}})
        }
        else if (result.role === "admin") {
            let token=await CreateToken(result['email'],result['id'],result['role']);
            let expireDuration=new Date(Date.now() +7*24*60*60*1000 );


            const cookieString=`token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;
            return NextResponse.json({ status: "success", data: { token,role:result.role } },{status:200,headers:{'set-cookie':cookieString}})
        }
        else {
            return NextResponse.json({ status: "fail", data: "Invalid user role" });
        }
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}
