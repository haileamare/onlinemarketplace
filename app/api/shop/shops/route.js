import ConnectToDatabase from "@/lib/connect"
import Shop from "@/models/shop.model"
import { NextResponse } from "next/server"

export async function GET(){
    await ConnectToDatabase()
    try{
        let shops=await Shop.find()
        return NextResponse.json({data:shops,message:"All shopes list"},{status:200})
    }catch(err){
        console.log('error',err.message)
      return NextResponse.json({error:"Internal server Error"},{status:500})
    }
}