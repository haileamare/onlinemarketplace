import ConnectToDatabase from "@/lib/connect";
import User from "@/models/user-model";
import { NextResponse } from "next/server";
export async function POST(req){
  const {name,email,password}=await req.json();

  if(!name || !email || !password){
    return NextResponse.json({error:"All fields are required"},{status:400})
  }
  try{
    
   await ConnectToDatabase();

   const existingUser=await User.findOne({email})

   if(existingUser){
    return NextResponse.json({error:"User already exists"},{status:409})
   }
   const user=new User({name,email});
   user.password=password;
    await user.save();
   return NextResponse.json({message:"Signup successfull",user:user})
    
  }catch(err){
    console.log('error  what is wrong',err)
    return NextResponse.json({error:"Internal Server Error",error:err},{status:500})
  }
}