import {Readable} from 'stream'
import formidable from 'formidable';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import productsModel from '@/models/products.model';
import { uploadToCloud } from '@/lib/cloudinary';
import ConnectToDatabase from '@/lib/connect';

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
  const shop=shopId
  if(!session.user.isSeller){
      console.log('unauthorized')
        return NextResponse.json({error:"you ain't authorized! you can't create Product"},{status:401})
      }
      try{
        await ConnectToDatabase();
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
      if(files.photo && Array.isArray(files.photo)){
        files.photo=files.photo[0]
      }
    
      const {name,description,category,quantity,price}=fields;
      const photo=files.photo;
    
      if(!photo){
        return NextResponse.json({error:"product image not uploaded"},{status:400})
      }


      console.log('fields')
      console.log('files')
        const result=await uploadToCloud(files,'/products/');
            console.log('resulttttttttttttttttt',result)
        const imageUrl=result.secure_url;
        const imagePubId=result.public_id
      const newproduct= new productsModel({
        name,
        description,
        category,
        quantity,
        price,
        shop,
        image:{
            url:imageUrl,
            public_url:imagePubId,
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
        await ConnectToDatabase();
        const products=await productsModel.find({shop:shopId}).populate('shop','_id name')
        if(!products){
          return NextResponse.json({message:"No Products avaliable"},{status:203})
        }
        return NextResponse.json({data:products,message:"products retrieved successfully"},{status:200})
    }catch(err){
        console.log('error in get products',err.message)
      return NextResponse.json({error:"internal server error"},{status:500}) 
}
}