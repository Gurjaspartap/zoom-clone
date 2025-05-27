"use server";

import { currentUser } from "@clerk/nextjs/server";
import StreamClientProvide from "../providers/StreamClientProvide";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_PUBLIC_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider =async ()=>{
    const user = await currentUser();
    if(!user || !user.emailAddresses[0].emailAddress) throw new Error("User not found");
    if(!apiKey || !apiSecret) throw new Error("Stream API keys not found");
    const client = new StreamClient(apiKey, apiSecret);
    const exp =Math.round(new Date().getTime()/1000) + 60*60;
    const issued= Math.floor(Date.now()/1000-60);
    const token = client.createToken(user.id,exp,issued);
    return token;
}
