import React from 'react';
import { Users, Video, Clock, BookOpenText, Book, Pin} from 'lucide-react';
import BetterCampusLogo from "../../public/bettercanvas_logo.jpeg"
import {fakeUsers} from "../helpers/fakeUsers.jsx";
import formatRoomDuration from "../helpers/formatRoomDuration.jsx";
import findHost from "../helpers/findHost.jsx";

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip'

// Map intensity → Tailwind text color classes
const intentOptions = {
  "Silent Study": 'text-teal-500',
  Collaborative: 'text-blue-500',
}

const RoomCard = ({ room, selectedRoomId, onClick}) => {
  const intentColor = intentOptions[room.intent];
  
  const hostUser = findHost(room.hostFirstName, room.hostLastName, room.hostEmail);
  console.log("hostuser", hostUser);

  const isBetterCampus = room.hostEmail.includes("@bettercampus.com");

 // console.log(room);

  return (
    <div
      onClick = {onClick}
      className={`
        rounded-xl bg-slate-50/70 shadow-sm backdrop-blur
        flex flex-col gap-2 px-6 py-3 transition-transform hover:-translate-y-[2px]
        hover:bg-slate-50 hover:cursor-pointer hover:duration-150 active:outline active:outline-blue-500 active:duration-150
      ${selectedRoomId == room.roomId ? "border border-slate-400": "border border-slate-200"}`}
    >
      {/* Top row: vibes + camera icon(if required) */}
      <div className="flex items-start justify-between">
          
        <div className = "flex gap-2 items-center">
          {isBetterCampus ?
            <div
              title="Camera Required"
              className="text-blue-500 -rotate-30"
            >
              <Pin size={16} />
            </div> : null}

          <span
            className={`
               text-[0.75rem] uppercase tracking-[0.1em]
              font-bold ${intentColor}
            `}
          >
            {room.intent}
          </span>
        </div>
          

        {room.cameraRequired && (
          <div
            title="Camera Required"
            className="text-slate-400"
          >
            <Video size={16} />
          </div>
        )}
      </div>
      
      {/**name & subject */}
      <div className = "flex flex-col">
        <span className="text-md font-semibold text-slate-900">
          {room.roomName}
        </span>

        {/* <div className="flex gap-2 text-md text-slate-900 font-medium items-center">
          {room.subject === "Anything" ?
            <BookOpenText strokeWidth={1.5} size={20} /> :
            <Book strokeWidth={1.5} size={20} />}
          <span>{room.subject}</span>
        </div> */}
      </div>
      

      <div className = "flex items-center gap-2">
          <img src = {hostUser.picture}
            className = "w-7 h-7 rounded-lg"/>
          <span className = "text-sm text-slate-500">with {room.hostFirstName}</span>
      </div>

      {/* Meta info row */}
      
      <div className = "flex justify-between items-center">

        <div className="flex gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>
              {room.currentParticipants.length}/50
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{formatRoomDuration(room.duration)}</span>
          </div>
        </div>

        {isBetterCampus?
          <div>
            <img src = {BetterCampusLogo} className = "w-8 h-8 rounded-lg"
              data-tooltip-id="better-campus-tooltip"/>
          </div>: null}
        
         <ReactTooltip
          id="better-campus-tooltip"
          place="top"
          content="This is an official Better Campus hosted room."
          className = "bg-blue-300"
      />
        

      </div>

    </div>
  );
};

export default RoomCard;
