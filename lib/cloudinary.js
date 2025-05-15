import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
cloudinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME
})

export const uploadToCloud=async (file,folderName)=>{
   console.log('filepateh',file.photo.filepath)
  if(!file) return null;
  return new Promise((resolve,reject)=>{
    const uploadStream=cloudinary.uploader.upload_stream(
        {folder:folderName},
        (error,result)=>{
        //  console.log('resulteclould',result)
            if(error) return reject(error)
            resolve(result)
        }


    )
    fs.createReadStream(file.photo.filepath).pipe(uploadStream)
  })
}
export const deleteCloudImage=async (publicId)=>{
  await cloudinary.uploader.destroy(publicId)
}

