"use client"

import { useUser } from "@clerk/nextjs";
import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { tokenProvider } from "../actions/stream.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.STREAM_PUBLIC_KEY || "y7dyf38h3vkp";

export const StreamClientProvide = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!user || !isLoaded) return;
    if (!apiKey) throw new Error("Missing Stream API key");
    const client = new StreamVideoClient({
      apiKey,
      user: { id: user?.id, name: user?.username || user?.id, image: user?.imageUrl },
      tokenProvider
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader/>;
  
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};
export default StreamClientProvide;