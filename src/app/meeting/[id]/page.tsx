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
} from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const MeetingContent = () => {
  const [isParticipantsListOpen, setIsParticipantsListOpen] = useState(false);
  const { useParticipants, useLocalParticipant } = useCallStateHooks();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();

  return (
    <div className="flex flex-col h-full">
      {/* Main video area */}
      <div className="flex-1 relative">
        {/* Grid layout for participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
          {/* Local participant preview */}
          {localParticipant && (
            <div className="relative rounded-lg overflow-hidden bg-gray-800">
              <ParticipantView participant={localParticipant} />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                You
              </div>
            </div>
          )}
          
          {/* Remote participants */}
          {participants
            .filter((p) => !p.isLocalParticipant)
            .map((participant) => (
              <div key={participant.sessionId} className="relative rounded-lg overflow-hidden bg-gray-800">
                <ParticipantView participant={participant} />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {participant.name || 'Participant'}
                </div>
              </div>
            ))}
        </div>

        {/* Participants list sidebar */}
        {isParticipantsListOpen && (
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-white text-lg font-semibold">Participants ({participants.length})</h2>
            </div>
            <CallParticipantsList onClose={() => setIsParticipantsListOpen(false)} />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsParticipantsListOpen(!isParticipantsListOpen)}
              className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Participants ({participants.length})
            </button>
          </div>
          <CallControls />
        </div>
      </div>
    </div>
  );
};

const MeetingPage = () => {
  const params = useParams();
  const meetingId = params?.id as string;
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    console.log('client', client);
    console.log('meetingId', meetingId);
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
    <div className="h-screen w-full bg-gray-900">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MeetingContent />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default MeetingPage;
