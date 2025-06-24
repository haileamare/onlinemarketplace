import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteCloudImage, uploadToCloud } from "@/lib/cloudinary";
import ConnectToDatabase from "@/lib/connect";
import shopModel from "@/models/shop.model";
import formidable from "formidable";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Readable } from 'stream'

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
        console.log('files',files,'fields',fields.photo)
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
  }
export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    const { shopId } = await params;
    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "not Authorized" }, { status: 501 })
    }

    try {
        let shop = await shopModel.findById(shopId)
            .populate('owner', '_id name')
            .exec()
        if (!shop) {
            return NextResponse.Json({
                error: "Shop not found"
            })
        }
        return NextResponse.json({ data: shop, message: "shop successfully retrieved" }, { status: 200 })
    } catch (err) {
        console.log('errrshopid')
        return NextResponse.json({ error: err.message }, { status: 501 })
    }
}

export async function PUT(req, { params }) {
    await ConnectToDatabase();
    const session = await getServerSession(authOptions)
    const { shopId } = await params;
    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "User not Authorized" }, { status: 401 })
    }
    try{
            const euser=await shopModel.findOne({_id:shopId})
            const { fields, files } =await parseForm(req)
             if(fields.name && Array.isArray(fields.name)){
                fields.name=fields.name[0]
             }
             if(fields.description && Array.isArray(fields.description)){
                fields.description=fields.description[0]
             }
             if(files && files.photo && Array.isArray(files.photo)){
                files.photo=files.photo[0]
             }
    
             const {name,description}=fields
             const {photo}=files
            const isSameImage = euser.image &&
                euser.image.original_filename === photo.originalFilename &&
                parseInt(euser.image.bytes) === photo.size;
            console.log('efnam', euser.image.original_filename === photo.originalFilename)
            console.log('ebytes', parseInt(euser.image.bytes) === photo.size)
            let imageUrl = euser.image.url
            let imagePubId = euser.image.public_id
        
            console.log('photo', isSameImage)
            if (!isSameImage) {
                if (euser?.image?.publicId) {
                    deleteCloudImage(euser.image.publicId)
                }
                const result = await uploadToCloud(files, '/user/profilespic/');

                console.log('public',result)
        
                imageUrl = result.secure_url;
                imagePubId = result.public_id
                const shop=await shopModel.findByIdAndUpdate(shopId,{
                    name:name,
                    description:description,
                    image:{
                        url:imageUrl,
                        public_url:imagePubId,
                        original_filename:photo.originalFilename,
                        bytes:photo.size
                    }
                },{
                    new:true,
                    runValidators:true
                }
           ).populate('owner','_id name')
        
             return NextResponse.json({data:shop,message:"Successfully updated"},{status:200})
            }
          const shop =await shopModel.findByIdAndUpdate(shopId,{
            name:name,
            description:description,
          },{
            new:true,
            runInvalidators:true
          }).populate('owner','_id name')
          console.log('shop',shop)
          return NextResponse.json({message:"Successfully updated"},{status:200})

    }catch(err){
      console.log('error inside update shop',err.message)
      return NextResponse.json({error:"internal server error while updating the shop"},{status:500})
    }

}

export async function DELETE(req, { params }) {
    await ConnectToDatabase()
    const session = await getServerSession(authOptions)
    const { shopId } = await params;
    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "User not Authorized" }, { status: 401 })
    }
    console.log('shopId',shopId)
    let shop = await shopModel.findById(shopId).populate('owner', '_id name')
    if (!shop) {
        return NextResponse.json({ error: "Shop not found" }, { status: 400 })
    }
    if (shop.owner._id.toString() != session.user.id) {
        return NextResponse.json({ error: "user not Authorized" }, { status: 401 })
    }
    deleteCloudImage(shop.image.public_url)
   //await shopModel.findByIdAndDelete(shopId)

   return NextResponse.json({message:"Shop deleted successfully"},{status:200})

}