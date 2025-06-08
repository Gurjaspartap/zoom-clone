"use client"
import HomeCard from "@/components/HomeCard";
import Header from "@/components/HomePage/Header";
import MeetingModal from "@/components/MeetingModal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { start } from "repl";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const {user} = useUser();
  const client = useStreamVideoClient();
  const [values,setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails,setCallDetails]= useState<Call>()
  const [meetingId, setMeetingId] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const createMeeting = async() => {
    if(!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call =client.call('default', id);
      if(!call) throw new Error('Failed to create call');
      const startsAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data:{
          starts_at :startsAt,
         custom :{
          description
         }
        }
      })
      setCallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log("Error creating meeting", error);
    }
  };

  const joinMeeting = () => {
    if (!meetingId) return;
    
    try {
      if (!meetingId) throw new Error('Invalid meeting link');
      
      // Navigate to the meeting page
      router.push(`/meeting/${meetingId}`);
    } catch (error) {
      console.log("Error joining meeting:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 pt-0 bg-black">
      <Header />

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 lg:px-40">
        <HomeCard
          className="bg-blue-500"
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Setup a new recording"
          handleClick={() => setMeetingState('isInstantMeeting')}
        />
        <HomeCard
          className="bg-green-500"
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
          className="bg-purple-600"
          img="/icons/schedule-meeting.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
          className="bg-yellow-400"
          img="/icons/view-recordings.svg"
          title="View Recordings"
          description="Meeting recordings"
          handleClick={() => router.push('/recordings')}
        />
      </div>

      {/* Meeting Modals */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        image="/icons/add-meeting.svg"
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join Meeting"
        buttonText="Join Meeting"
        handleClick={joinMeeting}
        image="/icons/join-meeting.svg"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter meeting link"
            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
          />
        </div>
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Schedule Meeting"
        buttonText="Schedule Meeting"
        handleClick={createMeeting}
        image="/icons/schedule-meeting.svg"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Meeting Title"
            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Input
            type="datetime-local"
            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </MeetingModal>
    </div>
  );
}
