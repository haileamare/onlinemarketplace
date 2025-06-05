import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import formidable from "formidable";
import {Readable} from 'stream'
import User from "@/models/user-model";
import { uploadToCloud } from "@/lib/cloudinary";
import ConnectToDatabase from "@/lib/connect";
import shopModel from "@/models/shop.model";

function parseForm(req) {
 
    const form = formidable({ keepExtensions: true, maxFileSize: 5 * 1024 * 1024 }); // 5MB
    const nodeStream = Readable.fromWeb(req.body);
     
    const nodeReq=Object.assign(nodeStream,{
        headers:Object.fromEntries(req.headers),
        method:req.method,
        url:req.url
    })
    return new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
  }

export async function POST(req,{params}){
   await ConnectToDatabase();
   const session=await getServerSession(authOptions);
   const {userId}=await params;

   if(!session || !session.user.isSeller || session.user.id !=userId){
      return NextResponse.json({error:"Forbidden you are not Authorized"},{status:403})
   }
   const user=await User.findOne({_id:userId})
   if(!user){
      return NextResponse.json({error:"Owner not found"},{status:404})
   }
   const reqBody=req;
    try{
      const {fields,files}=await parseForm(reqBody)
      
      if(fields.name && Array.isArray(fields.name)){
         fields.name=fields.name[0]
      }
      if(fields.description && Array.isArray(fields.description)){
         fields.description=fields.description[0]
      }
      if(files.photo && Array.isArray(files.photo)){
         files.photo=files.photo[0]
      }
      
      const {photo}=files
     const result=await uploadToCloud(files,'/user/shopspic/')
    
      const {name,description}=fields
      const shop= new shopModel({
         name,
         description,
         owner:userId,
         image:{
            url:result.secure_url,
            public_url:result.public_id,
            original_filename:photo.originalFilename,
            bytes:photo.size
         }
      })
      shop.save();

      return NextResponse.json({data:shop,message:"Shop successfully created!"},{status:201})
      
    }catch(err){
      console.log('error create shop',err.message)
       return NextResponse.json({error:err.message,message:"server error"},{status:501})
    }
   

}

export async function GET(req,{params}){
   await ConnectToDatabase();
   const {userId}=await params;
   const session=await getServerSession(authOptions);
   if(!session || !session.user.isSeller || session.user.id!=userId){
      console.log('errror ')
      return NextResponse.json({error:"Forbidden! user is not authorized"})
   }
   try{
      let shops=await shopModel.find({owner:userId}).populate('owner','_id name')
      return NextResponse.json({message:"successfully retrieved shopes by user",data:shops},{status:200})
   }catch(err){
       console.log('error',err.message)
       return NextResponse.json({error:"Internal Server Error"},{status:501})
   }   
}