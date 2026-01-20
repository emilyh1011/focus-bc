import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, NotebookPen, Clock, UserStar} from 'lucide-react';
import Timer from '../components/Timer';
import { RoomsContext } from '../contexts/RoomsContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import formatRoomDuration from '../helpers/formatRoomDuration';

import ChatSidebar from '../components/peers-room-session/ChatSidebar.jsx';
import IntentionsSidebar from '../components/peers-room-session/IntentionsSidebar.jsx';
import HostActions from '../components/peers-room-session/HostActions.jsx';
import Recap from '../components/peers-room-session/Recap.jsx';

import findRoom from "../helpers/findRoom.jsx";

function getGridCols(count) {
    if (count <= 1) return 1;
    if (count >= 2 && count <= 4) return 2;
    if (count >= 5 && count <= 9) return 3;
    return 4;                      // 10–16 → 4 cols
}

const RoomSession = () => {
    const { id } = useParams();
    console.log(id);
    
    const currentUser = useContext(CurrentUserContext);
    const { rooms, setRooms } = useContext(RoomsContext);
    console.log(rooms);
    const room = findRoom(id, rooms);
    console.log(room);

    const [micOn, setMicOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [sessionState, setSessionState] = useState('active'); // active | recap
    const [showIntentions, setShowIntentions] = useState(false);

    function displayName(person, hFN, hLN, hEmail) {
        //Is Host
        if (person.firstName === hFN && person.lastName === hLN && person.universityEmail === hEmail) {
            return "(Host)";
        } else if (person.firstName === currentUser.firstName && person.lastName === currentUser.lastName && person.universityEmail === currentUser.universityEmail) {
            //Is Current User
            return "(You)";
        } else {
            return ""
        }
    }

    const cols = getGridCols(room.currentParticipants.length);
    let gridColsClass;
    if (cols === 1) {
        gridColsClass = "grid-cols-1";
    } else if (cols === 2) {
        gridColsClass = "grid-cols-2";
    } else if (cols === 3) {
        gridColsClass = "grid-cols-3";
    } else {
        gridColsClass = "grid-cols-4";
    }

    //Create a new ordered current participants array, where currentUser is placed at the front, and dedupe currentUser from currentParticipants
    //This way we can render all screens where currentUser is first screen
    const dedupedCurrent = room.currentParticipants.filter((p) => {
        if (p.universityEmail !== currentUser.universityEmail || p.firstName !== currentUser.firstName || p.lastName !== currentUser.lastName) {
            return p;
        }
    });
    const orderedCurrentParticipants = [currentUser, ...dedupedCurrent];

    //Keep track if current user should be allowed host actions
    let isCurrentUserHost;
    if (currentUser.firstName === room.hostFirstName && currentUser.lastName === room.hostLastName && currentUser.universityEmail === room.hostEmail) {
        isCurrentUserHost = true;
    } else {
        isCurrentUserHost = false;
    }

    const [showHostActions, setShowHostActions] = useState(false);

    const handleLeave = () => {
        const ok = window.confirm('Are you sure you want to end the session?');
        if (!ok) return;
        setSessionState('recap');

        //When current user leaves, remove current user from rooms' currentParticipants and remove their intentions from rooms' intentions
        const removeUser = room.currentParticipants.filter(p => p.firstName !== currentUser.firstName || p.lastName !== currentUser.lastName || p.universityEmail !== currentUser.universityEmail);
        const removeIntentions = room.intentions.filter(i => i.firstName !== currentUser.firstName || i.lastName !== currentUser.lastName || i.universityEmail !== currentUser.universityEmail);

        //To do this, we need to remove the room, copy it, and replace it with updated fields
        const copyRoom = { ...room, currentParticipants: removeUser, intentions: removeIntentions };
        // const removedRoom = rooms.filter(r => r.roomId !== roomCopy.roomId);
        // setRooms([...removedRoom, roomCopy]);

        const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
        if (ogIndex === -1) return; // safety check

        const newRooms = [...rooms];
        newRooms[ogIndex] = copyRoom;

        setRooms(newRooms);
    };

    /* ---------- RECAP VIEW ---------- */
    if (sessionState === 'recap') {
        return ( <Recap room = {room}/> )
    }

    /* ---------- LIVE SESSION VIEW ---------- */
    return (
        <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden bg-zinc-900 p-4">
            {/* Main Content */}
            <div className="flex w-full flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col">

                    <h2 className="text-lg font-medium text-white">{room.roomName}</h2>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-slate-200">
                            <Clock size={14} />
                            {room.duration == 1440 ?
                                <span>{formatRoomDuration(room.duration)}</span>
                                : <span>{formatRoomDuration(room.duration)} left</span>}
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-200">
                            <Users size={14} />
                            <span>{room.currentParticipants.length}/50</span>
                        </div>

                        {room.cameraRequired ? <div className="flex items-center gap-1 text-sm text-slate-200">
                            <Video size={14} />
                            <span>Required</span>
                        </div> : null}
                    </div>

                </div>

                {/* Video Grid */}
                <div className={`grid ${gridColsClass} gap-2 mx-auto justify-center items-center h-full w-full max-h-5/6`}>
                    {orderedCurrentParticipants.map((p) => {
                        return <div className="w-full h-full bg-zinc-800 rounded-xl shadow-sm overflow-hidden aspect-video flex items-center justify-center relative"
                            key={p.universityEmail}>
                            {cameraOn && p.universityEmail === currentUser.universityEmail ?
                                null : <img src={p.picture} className="h-16 w-16 rounded-full" />
                            }
                            <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                                {p.firstName} {p.lastName}{displayName(p, room.hostFirstName, room.hostLastName, room.hostEmail)}
                            </div>
                        </div>
                    })}

                </div>

                {/* Controls Bar */}
                <div className="flex w-full items-center">

                    <div className="flex justify-center gap-2 flex-1">
                        {/* Mic */}
                        <button
                            type="button"
                            className={`inline-flex items-center justify-center rounded-full text-sm font-medium shadow-sm h-10 w-10
                            ${micOn
                                    ? 'transition duration-150 text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500 hover:cursor-pointer hover:shadow-lg hover:-translate-y-[1px]'
                                    : 'transition duration-150 bg-red-500/90 text-white hover:-translate-y-[1px] hover:cursor-pointer hover:duration-150'
                                }`}
                            onClick={() => setMicOn(!micOn)}
                        >
                            {micOn ? <Mic size={16} /> : <MicOff size={16} />}
                        </button>

                        {/* Camera */}
                        <button
                            type="button"
                            className={`inline-flex items-center justify-center rounded-full text-sm font-medium transition shadow-sm  h-10 w-10
                            ${cameraOn ? 'transition duration-150 text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500 hover:cursor-pointer hover:shadow-lg hover:-translate-y-[1px]'
                                    : 'transition duration-150 bg-red-500/90 text-white hover:-translate-y-[1px] hover:cursor-pointer hover:duration-150'
                                }`}
                            onClick={() => setCameraOn(!cameraOn)}
                        >
                            {cameraOn ? <Video size={16} /> : <VideoOff size={16} />}
                        </button>

                        {/* Chat toggle */}
                        <button
                            type="button"
                            className={` inline-flex items-center justify-center
                            rounded-full text-sm font-medium shadow-sm h-10 w-10
                                    
                            ${showChat && !showIntentions && !showHostActions
                                    ? 'transition duration-150 bg-white text-zinc-700 hover:cursor-pointer'
                                    : 'transition duration-150 bg-zinc-700 text-white hover:cursor-pointer hover:bg-slate-50/75 hover:text-zinc-700 hover:duration-150'
                                }`}
                            onClick={() => {
                                if (showChat) {
                                    setShowChat(false);
                                } else {
                                    setShowIntentions(false);
                                    setShowHostActions(false);
                                    setShowChat(true);
                                }
                            }}
                        >
                            <MessageSquare size={16} />
                        </button>

                        {/* Intentions / Goals toggle */}
                        <button
                            type="button"
                            className={`inline-flex items-center justify-center
                            rounded-full text-sm font-medium shadow-sm h-10 w-10
                             ${showIntentions && !showChat && !showHostActions
                                    ? 'transition duration-150 bg-white text-zinc-700 hover:cursor-pointer'
                                    : 'transition duration-150 bg-zinc-700 text-white hover:cursor-pointer hover:bg-slate-50/75 hover:text-zinc-700 hover:duration-150'
                                }`}
                            onClick={() => {
                                if (showIntentions) {
                                    setShowIntentions(false);
                                } else {
                                    setShowChat(false);
                                    setShowHostActions(false);
                                    setShowIntentions(true);
                                }
                            }}
                        >
                            <NotebookPen size={16} />
                        </button>

                        {/* Leave */}
                        <button
                            type="button"
                            className=" inline-flex items-center justify-center
                            rounded-full
                            text-sm font-medium
                            transition
                            shadow-sm h-10 w-10 bg-zinc-700 text-red-500 hover:cursor-pointer hover:text-white hover:bg-red-500 hover:duration-150"
                            onClick={handleLeave}
                        >
                            <PhoneOff size={16} />
                        </button>
                    </div>

                    {/**Host actions */}
                    {isCurrentUserHost ?
                        <button
                            type="button"
                            className={`inline-flex items-center justify-center
                            rounded-full text-sm font-medium shadow-sm h-10 w-10
                             ${showHostActions && !showIntentions && !showChat
                                    ? 'transition duration-150 bg-white text-zinc-700 hover:cursor-pointer'
                                    : 'transition duration-150 bg-zinc-700 text-white hover:cursor-pointer hover:bg-slate-50/75 hover:text-zinc-700 hover:duration-150'
                                }`}
                            onClick={() => {
                                if (showHostActions) {
                                    setShowHostActions(false);
                                } else {
                                    setShowChat(false);
                                    setShowIntentions(false);
                                    setShowHostActions(true);
                                }
                            }}>
                            <UserStar size={16} />
                        </button>
                        : null}
                </div>
            </div>

            {/* Chat Sidebar */}
            {showChat && !showIntentions && !showHostActions && (
                <ChatSidebar room = {room}/>
            )}

            {/* Intentions Sidebar */}
            {showIntentions && !showChat && !showHostActions && (
                <IntentionsSidebar room = {room}/>
            )}

            {/* Host Actions Sidebar */}
            {!showIntentions && !showChat && showHostActions ?
               <HostActions room = {room} setSessionState={setSessionState}/> : null}
        </div>
    );
};

export default RoomSession;
