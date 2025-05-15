import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/models/user-model";
import ConnectToDatabase from "@/lib/connect";

export async function GET(req, { params }) {
    await ConnectToDatabase()
  const session = await getServerSession(authOptions); // ✅ correctly passed
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
 
  const { userId } = await params;

  const user=await User.findOne({_id:userId})
  return NextResponse.json({ message: `Welcome, ${session.user.email}` ,data:user}, { status: 200 });
}

export async function DELETE(req,{params}){
    
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
   const {userId}=await params
    if(userId!=session.user.id){
        return NextResponse.json({error:"Forbbiden"},{status:403})
    }
    try{
        const user=await User.deleteOne({_id:session.user.id})
        return NextResponse.json({message:'User Successfully Deleted'},{status:201})
    }catch(err){
 console.log('cannot delete user due to',err)
     return NextResponse.json({error:"Internal Server Error"},{status:501})
    }

}
