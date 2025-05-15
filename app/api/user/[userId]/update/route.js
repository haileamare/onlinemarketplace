import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/user-model";
import cloudinary, { deleteCloudImage, uploadToCloud } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/connect";
import formidable from "formidable";
import { Readable } from "stream";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

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
  

export async function PUT(req, { params }) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  const { userId } =await params;

  if (!session || session.user.id !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const reqBody = req; // required for formidable

  try {
    const { fields, files } = await parseForm(reqBody);
    console.log(fields.name)
    if(fields.name && Array.isArray(fields.name)){
      fields.name=fields.name[0]
    }
    if(fields.email && Array.isArray(fields.email)){
      fields.email=fields.email[0]
    }
    if(fields.password && Array.isArray(fields.password)){
      fields.password=fields.password[0]
    }
    if(fields.seller && Array.isArray(fields.seller)){
      fields.seller=fields.seller[0]
    }
    if(fields.photo && Array.isArrray(fields.photo)){
      fields.photo=fields.photo[0]
    }
    if(fields.about && Array.isArray(fields.about)){
      fields.about=fields.about[0]
    }
    if(files && Array.isArray(files.photo) ){
      files.photo=files.photo[0]
    }
    const { name, email, password, seller,about} = fields;
    const photo = files.photo;
    if (!photo) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }
    const euser=await User.findById(userId);
 
    const isSameImage=euser.image && 
      euser.image.original_filename===photo.originalFilename &&
      parseInt(euser.image.bytes)===photo.size;
    console.log('efnam',euser.image.original_filename===photo.originalFilename)
    console.log('ebytes',parseInt(euser.image.bytes)===photo.size)
    let imageUrl=euser.image.url
    let imagePubId=euser.image.public_id

    console.log('photo',isSameImage)
    if(isSameImage){
      if(euser?.image?.publicId){
        deleteCloudImage(euser.image.publicId)
      }
      const result=await uploadToCloud(files,'/user/profilespic/');
      console.log('resulttttttttttttttttt')
      imageUrl=result.secure_url;
      imagePubId=result.public_id
    }

    const updatedUser=await User.findByIdAndUpdate(userId,{
      name,
      email,
      password,
      seller,
      about,
      image:{
        url:imageUrl,
        public_id:imagePubId,
        bytes:photo.size,
        original_filename:photo.originalFilename
      },
    },
  {new:true})
  return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.log('error',err.message)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
