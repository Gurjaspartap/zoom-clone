"use client"

import { useUser } from "@clerk/nextjs";
import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { tokenProvider } from "../actions/stream.actions";
import Loader from "@/components/Loader";
import { SignInButton } from "@clerk/nextjs";

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

  if (!isLoaded) return <Loader />;
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark-1">
        <h1 className="text-2xl font-bold  mb-4">Please sign in to continue</h1>
        <SignInButton mode="modal">
          <button className="bg-blue-1 hover:bg-blue-1/80 text-white px-4 py-2 rounded-lg">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  if (!videoClient) return <Loader />;
  
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamClientProvide;