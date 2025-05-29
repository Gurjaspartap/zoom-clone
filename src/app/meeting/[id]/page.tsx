'use client';

import {
  StreamVideo,
  Call,
  CallControls,
  CallParticipantsList,
  useStreamVideoClient,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const MeetingPage = () => {
  const params = useParams();
  const meetingId = params?.id as string;
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [isParticipantsListOpen, setIsParticipantsListOpen] = useState(false);

  useEffect(() => {
    if (!client || !meetingId) return;

    const currentCall = client.call('default', meetingId);
    
    // Join the call with audio and video enabled
    currentCall.join({ create: true })
      .then(() => {
        setCall(currentCall);
        console.log('Successfully joined the call');
      })
      .catch((err) => console.error('Failed to join call:', err));

    return () => {
      currentCall.leave();
    };
  }, [client, meetingId]);

  if (!client || !call) return <Loader />;

  return (
    <div className="h-screen w-full">
      <StreamVideo client={client}>
        <div className="flex flex-col h-full">
          <div className="flex-1 relative">
            <CallParticipantsList 
              onClose={() => setIsParticipantsListOpen(false)}
            />
          </div>
          <div className="flex justify-center p-4">
            <CallControls />
          </div>
        </div>
      </StreamVideo>
    </div>
  );
};

export default MeetingPage;
