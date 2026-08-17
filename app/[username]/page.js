"use server"

import React from 'react'
import Track from '@/components/trackPayments';
import { notFound } from 'next/navigation';
import User from '@/models/User';
import connectDB from '@/db/ConnectDB';


const Username = async ({ params }) => {
  const { username } = await params;
  await connectDB()
  const user = await User.findOne({name : decodeURIComponent(username)})
  if(!user)
  {
    return notFound()
  }

  return (
    <Track username={decodeURIComponent(username)} />
  )
}

export default Username

export async function generateMetadata({ params }) {
 const { username } = await params;
 return {
  title: `Support ${decodeURIComponent(username)} - Get Me A Chai`
 }
}