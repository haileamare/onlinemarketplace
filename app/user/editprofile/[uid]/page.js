import EditProfileForm from "@/component/form/editprofileform";
import { headers } from "next/headers";
import { Fragment } from "react";

export default async function EditProfile({params}){
     const {uid}=await params;
     console.log('uid',uid)
     let user={}
       try{
          let response=await fetch(`http://localhost:3000/api/user/${uid}`,{
            method:'GET',
            credentials:'include',
            headers:await headers()
          });
          if(!response.ok){
            throw new Error('Bad Delete Request')
          }
          const {message,data}=await response.json();
          user={...data}
      
         }catch(err){
           console.log('error in delete user client api',err)
         }
        
    return (
        <Fragment>
            <EditProfileForm userData={user}/>
        </Fragment>
    )
}