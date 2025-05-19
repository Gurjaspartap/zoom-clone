import Card from "@/components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-8 pt-0">
      {/* Header */}
      <div className="flex flex-col gap-2 mt-8">
        <h1 className="text-4xl font-bold text-white">12:04 <span className="text-lg font-normal">PM</span></h1>
        <p className="text-lg text-gray-300">Friday, 29 March 2024</p>
        <div className="mt-2 bg-dark-2 rounded-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-400">Upcoming Meeting at: 12:30 PM</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card/>
        <div className="bg-blue-500 rounded-xl p-6 flex flex-col gap-2 shadow-lg">
          <span className="text-2xl text-white font-bold">🔗</span>
          <span className="text-lg text-white font-semibold">Join Meeting</span>
          <span className="text-sm text-white/80">via invitation link</span>
        </div>
        <div className="bg-purple-600 rounded-xl p-6 flex flex-col gap-2 shadow-lg">
          <span className="text-2xl text-white font-bold">📅</span>
          <span className="text-lg text-white font-semibold">Schedule Meeting</span>
          <span className="text-sm text-white/80">Plan your meeting</span>
        </div>
        <div className="bg-yellow-400 rounded-xl p-6 flex flex-col gap-2 shadow-lg">
          <span className="text-2xl text-white font-bold">🎥</span>
          <span className="text-lg text-white font-semibold">View Recordings</span>
          <span className="text-sm text-white/80">Meeting recordings</span>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="mt-8">
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
      </div>
    </div>
  );
}
