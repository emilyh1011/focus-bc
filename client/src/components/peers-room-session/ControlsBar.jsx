import { useState, useContext } from "react";
import {Mic, MicOff, VideoOff, PhoneOff, MessageSquare, NotebookPen, UserStar} from "lucide-react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ControlsBar({cameraOn, setCameraOn, showChat, setShowChat, showIntentions, setShowIntentions,
    showHostActions, setShowHostActions
}) {
    const currentUser = useContext(CurrentUserContext);
    const [micOn, setMicOn] = useState(false);

    //Keep track if current user should be allowed host actions
    let isCurrentUserHost;
    if (currentUser.firstName === room.hostFirstName && currentUser.lastName === room.hostLastName && currentUser.universityEmail === room.hostEmail) {
        isCurrentUserHost = true;
    } else {
        isCurrentUserHost = false;
    }
    
    return (
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
    )
}
export default ControlsBar