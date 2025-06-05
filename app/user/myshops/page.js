import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ShopsLayout from "@/app/shop/layout";
import MyShopsUi from "@/component/shops/myshops";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { Fragment } from "react";

export default async function MyShops(){
    const session=await getServerSession(authOptions)
    let shops=[]
    try{
      let response=await fetch('http://localhost:3000/api/shop/'+session.user.id,{
        method:'GET',
        headers:await headers(),
        next:{revalidate:60}
      })
      if(response.ok){
        const {data}=await response.json();
        shops=data
      }else{
        throw new Error('Error in response')
      }
    }catch(err){
       console.log('error in fetch my shops',err.message)
    }
  return (
    <Fragment>
        <MyShopsUi shops={shops}/>
    </Fragment>
  )
}