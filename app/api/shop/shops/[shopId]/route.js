import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import shopModel from "@/models/shop.model";
import formidable from "formidable";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {Readable} from 'stream'

function parseReq(req){
    let form=formidable({keepExtensions:true,maxFileSize:5*1024*1024});
    const nodeStream=Readable.fromWeb(req.body);
    
    const nodeReq=Object.assign(nodeStream,{
        headers:Object.fromEntries(req.headers),
        method:req.method,
        url:req.url
    })

    return new Promise((reject,resolve)=>{
        form.parse(nodeReq,(err,fields,files)=>{
          if(err) reject(err)
            resolve({fields,files})
        })
    })

}
export  async function GET(req,{params}){
    const session=await getServerSession(authOptions);
    const {shopId}=await params;
    
    if(!session || !session.user.isSeller){
        return NextResponse.json({error:"not Authorized"},{status:501})
    }

    try{
        let shop=await shopModel.findById(shopId)
        .populate('owner','_id name')
        .exec()
        if(!shop){
            return NextResponse.Json({
                error:"Shop not found"
            })
        }
        return NextResponse.json({data:shop,message:"shop successfully retrieved"},{status:200})
    }catch(err){
         return NextResponse.json({error:err.message},{status:501})
    }
}

export async function PUT(req,{params}){
 
}