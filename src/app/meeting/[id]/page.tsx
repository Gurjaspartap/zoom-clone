'use client';

import {
  StreamVideo,
  Call,
  CallControls,
  CallParticipantsList,
  useStreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
  VideoPreview,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallingState,
} from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loader from '@/components/Loader';

const MeetingContent = () => {
  const call = useCall();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();

  // Show loading while call is connecting
  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <Loader />
          <p className="text-white mt-4">Joining meeting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-white text-lg font-semibold">
            Meeting • {participants.length} participant{participants.length !== 1 ? 's' : ''}
          </h1>
          <div className="text-gray-400 text-sm">
            Meeting ID: {call?.id}
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 relative overflow-hidden">
        {participants.length > 0 ? (
          <SpeakerLayout 
            participantsBarPosition="bottom"
            participantsBarLimit={6}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <p className="text-xl mb-2">Waiting for participants to join...</p>
              <p className="text-sm">Share the meeting ID with others to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3">
            <CallControls />
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetingPage = () => {
  const { id: meetingId } = useParams();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    const joinCall = async () => {
      if (!client || !meetingId || hasJoinedRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Create/get the call
        const currentCall = client.call('default', meetingId as string);
        
        // Join the call
        await currentCall.join({ 
          create: true,
          data: {
            members: [], // Add specific members if needed
          }
        });
        
        setCall(currentCall);
        hasJoinedRef.current = true;
        
      } catch (err) {
        console.error('Failed to join call:', err);
        setError('Failed to join the meeting. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    joinCall();

    // Cleanup function
    return () => {
      if (call && hasJoinedRef.current) {
        call.leave().catch(console.error);
        hasJoinedRef.current = false;
      }
    };
  }, [client, meetingId]);

  // Handle client not available
  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <Loader />
          <p className="mt-4">Initializing video client...</p>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <Loader />
          <p className="mt-4">Connecting to meeting...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white max-w-md">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle call not available
  if (!call) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <Loader />
          <p className="mt-4">Setting up meeting...</p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <MeetingContent />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

export default MeetingPage;