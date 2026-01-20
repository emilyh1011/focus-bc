import { useState, useContext } from 'react';
import { RoomsContext } from '../../contexts/RoomsContext.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

import ChatSidebar from './ChatSidebar.jsx';
import IntentionsSidebar from './IntentionsSidebar.jsx';
import HostActions from './HostActions.jsx';
import { Clock, Users, Video } from 'lucide-react';
import formatRoomDuration from '../../helpers/formatRoomDuration.jsx';
import ControlsBar from './ControlsBar.jsx';

function PeersSession({ room, setSessionState}) {
    const currentUser = useContext(CurrentUserContext);

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

    function getGridCols(count) {
        if (count <= 1) return 1;
        if (count >= 2 && count <= 4) return 2;
        if (count >= 5 && count <= 9) return 3;
        return 4;                      // 10–16 → 4 cols
    }

    const cols = getGridCols(room.currentParticipants.length);
    let gridColsClass;
    const { rooms, setRooms } = useContext(RoomsContext);
    const [cameraOn, setCameraOn] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showIntentions, setShowIntentions] = useState(false);
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
                <ControlsBar cameraOn={cameraOn} setCameraOn={setCameraOn} showChat={showChat} 
                    setShowChat={setShowChat} showIntentions={showIntentions} setShowIntentions={setShowIntentions}
                    showHostActions={showHostActions} setShowHostActions={setShowHostActions}/>
            </div>

            {/* Chat Sidebar */}
            {showChat && !showIntentions && !showHostActions && (
                <ChatSidebar room={room} />
            )}

            {/* Intentions Sidebar */}
            {showIntentions && !showChat && !showHostActions && (
                <IntentionsSidebar room={room} />
            )}

            {/* Host Actions Sidebar */}
            {!showIntentions && !showChat && showHostActions ?
                <HostActions room={room} setSessionState={setSessionState} /> : null}
        </div>
    )
}
export default PeersSession