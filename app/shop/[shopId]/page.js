'use client'
import { Avatar, CardContent, Typography, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter,params, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default  function Shop(){
    const [shop,setShop]=useState('')
    const [error,setError]=useState('')
    const {data:session,status}=useSession()
    const router=useRouter();
    const {shopId}=useParams();
    const theme=useTheme()
    useEffect(async ()=>{
        const abortController=new AbortController()
        const signal=abortController.signal

        try{
            let response=await fetch('http://localhost:3000/api/shop'+shopId,{
                method:'GET',
                credentials:'include'
            }
            )
            if(response.ok){
                const data=await response.json();
                setShop(data)
            }else{
                throw new Error("can not read shop")
            }
        }catch(err){
            console.log('error',err.message)
        }
    })

    if(status==='unauthenticated'){
        router.push('/signin')
    }
    if(status==='loading'){
        return <div>Loading....</div>
    }

    return (
        <CardContent>
            <Typography type="headline" component={'h2'}>
                {shop.name}
            </Typography>
            <Avatar src={shop.image.url}/>
            <Typography type="subheading" component={"h2"}>
                {shop.description}
            </Typography>
        </CardContent>
    )
}