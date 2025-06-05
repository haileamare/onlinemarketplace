import AllShops from "@/component/shops/allshops";
import shopModel from "@/models/shop.model";
import { Fragment } from "react";

export default async function Shops(){
    //const {data:session}=await getServerSession(authOptions)
    let shops=[]
    try{
      let result=await fetch('http://localhost:3000/api/shop/allshopes/',{
        method:'GET',
        headers:{
          'Accept':'application/json'
        }
      })
      if (result.ok) {
        const res = await result.json();  // Properly extract JSON response
        shops=res.data
      } else {
        console.error("Failed to fetch users.");
      }
    }catch(err){
       
      console.log('cannot get all shops',err.message)
    } 
    console.log('shopes',shops)
    return(
        <Fragment>
        <AllShops shops={shops}/>
        </Fragment>
    )
}