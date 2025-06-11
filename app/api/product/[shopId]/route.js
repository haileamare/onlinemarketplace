import {Readable} from 'stream'
import formidable from 'formidable';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import productsModel from '@/models/products.model';
import { uploadToCloud } from '@/lib/cloudinary';

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
    const session =await getServerSession(authOptions);
    const {shopId}=await params
    if(!session.user.isSeller){
        return NextResponse.json({error:"you ain't authorized! you can't create Product"})
    }
try{
      await connectToDatabase();
      const {fields,files}=await parseForm(req);
      
      if(fields.name && Array.isArray(fields.name)){
        fields.name=fields.name[0]
      }
      if(fields.description && Array.isArray(fields.description)){
        fields.description=fields.description[0]
      }
      if(fields.category && Array.isArray(fields.category)){
        fields.category=fields.category[0]
      }
      if(fields.quantity && Array.isArray(fields.quantity)){
        fields.quantity=fields.quantity[0]
      }
      if(fields.price && Array.isArray(fields.price)){
        fields.price=fields.price[0];
      }
      if(files.image && Array.isArray(files.image)){
        files.image=files.image[0]
      }
    
      const {name,description,category,quantity,price}=fields;
      const photo=files.image;
      
      if(!photo){
        return NextResponse.json({error:"product image not uploaded"},{status:400})
      }

        const result=await uploadToCloud(files,'/products/');
            console.log('resulttttttttttttttttt')
        const imageUrl=result.secure_url;
        const imagePubId=result.public_id

      const newproduct= new productsModel({
        name,
        description,
        category,
        quantity,
        price,
        shopId,
        image:{
            url:imageUrl,
            public_id:imagePubId,
            bytes:photo.size,
            original_filename:photo.originalFilename
      }})

      await newproduct.save();
  
      return NextResponse.json({message:"New product successfully added",data:newproduct},{status:200})

  }catch(err){
    console.log("err",err.message)
     return NextResponse.json({error:"Internal Server Error"},{status:500})
  }
}

export async function GET(req,{params}){
    const {shopId}=await params;

    try{
        await connectToDatabase();
        
        
    }catch(err){

    }
}