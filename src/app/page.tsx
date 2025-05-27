"use client"
import HomeCard from "@/components/HomeCard";
import Header from "@/components/HomePage/Header";
import { useRouter } from "next/navigation";

import { useState } from "react";
export default function Home() {
  const router =useRouter()
 const  [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting' | undefined>()
  return (
    <div className="flex flex-col gap-8 p-8 pt-0 bg-black">
    <Header/>

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  lg:px-40">
        <HomeCard
          className="bg-blue-500"
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Setup a new recording"
          handleClick={()=>setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
          className="bg-green-500"
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          handleClick={()=>setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
          className="bg-purple-600"
          img="/icons/schedule-meeting.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          handleClick={()=>setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
          className="bg-yellow-400"
          img="/icons/view-recordings.svg"
          title="View Recordings"
          description="Meeting recordings"
          handleClick={()=>router.push('/recordings')}
        />
      </div>

      {/* Upcoming Meetings */}
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Today's Upcoming Meetings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-2 rounded-xl p-6 flex flex-col gap-2 shadow">
            <span className="text-white font-semibold">Team Sync: Sprint Planning & Updates</span>
            <span className="text-gray-400 text-sm">March 15, 2024 - 10:00 AM</span>
            <div className="flex items-center gap-2 mt-2">
              <Image src="/images/avatar-1.jpeg" alt="avatar" width={32} height={32} className="rounded-full" />
              <Image src="/images/avatar-2.jpeg" alt="avatar" width={32} height={32} className="rounded-full" />
              <span className="text-xs text-gray-400 ml-2">+9</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Start</button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Copy Invitation</button>
            </div>
          </div>
          <div className="bg-dark-2 rounded-xl p-6 flex flex-col gap-2 shadow">
            <span className="text-white font-semibold">Project Pulse Check: Weekly Standup</span>
            <span className="text-gray-400 text-sm">March 15, 2024 - 10:00 AM</span>
            <div className="flex items-center gap-2 mt-2">
              <Image src="/images/avatar-3.png" alt="avatar" width={32} height={32} className="rounded-full" />
              <Image src="/images/avatar-4.png" alt="avatar" width={32} height={32} className="rounded-full" />
              <span className="text-xs text-gray-400 ml-2">+9</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Start</button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Copy Invitation</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
