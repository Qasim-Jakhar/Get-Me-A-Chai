"use server"
import { MongoClient } from "mongodb";
import Customer from "@/models/User";
import connectDB from "@/db/ConnectDB";
import Payment from "@/models/Payment";
import mongoose from "mongoose";
import User from "@/models/User";

const client = new MongoClient("mongodb://localhost:27017")

export default async function getValuesFromUser(data) {
    
  let form = await data;
}


export const fetchUser = async () => {
  await client.connect()
  const db = client.db("ChaiDB")
  const customers = await db.collection("customers").find({}).toArray()
  const payments =  await db.collection("payments").find({}).toArray()

  let NewArray = customers.map(user=>{
    return {...user, _id: user._id.toString()}
  })
  
  // let noPay = NewArray.map(async c=>{
  //  let  payment = await Payment.find({}).sort({amount: -1}).lean()
  //   return payment
  // })
  let payArray = payments.map(p =>{
    return {...p, _id: p._id.toString(), customerId: p.customerId.toString()}
  })

  let array = {id: "", name: "", paidTo: "", amount: 0, description: ""}
let result = payArray.map(p=>{
  return {...array, id: p.customerId, name: NewArray.find(a=>p.customerId === a._id).name, paidTo: p.paidTo, amount: p.amount, description: p.description}
})
  return result.sort((a,b)=>b.amount - a.amount)
}


export const updateProfile = async (data, oldUsername) => {
  await connectDB()
  let nData = Object.fromEntries(data)
  if (oldUsername !== nData.username) {
    let u = await User.findOne({username: nData.username})
    if (u) {
      return { "error:": "Username already Exist" }
    }
    await User.updateOne({email: nData.email}, nData)

    await Payment.updateMany({paidTo: oldUsername}, {paidTo: nData.username})
  }
  else{
    await User.updateOne({email: nData.email}, nData)
  }
}

export const GetUser = async (email) => {
  await connectDB()
  let user = await User.findOne({email: email})
  return user.toObject({flattenObjectIds: true})
}


