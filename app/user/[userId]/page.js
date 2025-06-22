'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/component/profile/profile";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { headers } from "next/headers";
import { Fragment } from "react";

export default async function UserProfile({ params }) {
   const session=await getServerSession(authOptions)
   console.log('sessiontoken',session.token)
   console.log('sever session',session)
  const { userId } = await params; // No need to await
  let userData = {};

  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'GET',
      credentials:'include',
      headers:await headers()
    });

    if (!response.ok) {
      console.log('what')
    }

    const {data} = await response.json();
    console.log('data', data);
    userData = { ...data };

  } catch (err) {
    console.log('Could not retrieve user details', err);
    userData = { error: 'Failed to load user data' }; // Provide fallback data
  }


  return (
    <Fragment>
      {userData && !userData.error ? (
        <Profile userData={userData} session={session}/>
      ) : (
        <p>Error loading user data. Please try again later.</p>
      )}
    </Fragment>
  );
}