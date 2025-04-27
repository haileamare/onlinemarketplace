import Profile from "@/component/profile/profile";
import { Fragment } from "react";

export default async function UserProfile(params){
    console.log('id',params.userId)
    console.log('haile')
    let userData={}
//     try{
//     let response=await fetch('http/localhost:3000/user'+params.userId,{
//         method:'GET',
//         headers:{
//             'Accept':'application/json'
//         }
//     })
//    // const data=await response.json()
//     userData={...await response.json()}
//     }catch(err){
//       console.log('could not retrived user detail',err)
//     }
//     console.log('userData',userData)
    return (
        <Fragment>
            <Profile userData={userData}/>
        </Fragment>
    )
}