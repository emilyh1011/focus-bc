import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { RoomsContext } from "../contexts/RoomsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpenText, Book, Clock, Video, University } from "lucide-react";
import findRoom from "../helpers/findRoom";
import findHost from "../helpers/findHost";
import formatRoomDuration from "../helpers/formatRoomDuration";

//Peers Page: Right side of screen displaying the selected room
function SelectedRoomDetails({ selectedRoom, selectedRoomId, intentOptions }) {
    const { rooms, setRooms } = useContext(RoomsContext);
    const currentUser = useContext(CurrentUserContext);
    console.log("currentUser", currentUser);

    const selectedHost = findHost(selectedRoom.hostFirstName, selectedRoom.hostLastName, selectedRoom.hostEmail);
    const isSelectedBetterCampus = selectedRoom.hostEmail.includes("@bettercampus.com");

    const navigate = useNavigate();

    const handleJoin = (roomId) => {
        console.log('Joining room', roomId);

        //Update the rooms context, so that the joined room's currentParticipants includes the current user
        //Remove original room from rooms, replace with a copyRoom that includes updated currentParticipants
        const room = findRoom(roomId, rooms);

        const addUser = [...room.currentParticipants, currentUser];
        const copyRoom = { ...room, currentParticipants: addUser };

        const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //preserve ordering
        if (ogIndex === -1) return; // safety check

        const newRooms = [...rooms];
        newRooms[ogIndex] = copyRoom;

        setRooms(newRooms);

        //Navigate to room
        //Update current user's sessions attended to include this room, only if this roomid isn't already in array
        //Ex: user leaves room for 5 minutes for a break but rejoins later
        const hasAttended = currentUser.sessionsAttended.find((r) => r === roomId);
        if (!hasAttended) {
            currentUser.sessionsAttended = [...currentUser.sessionsAttended, roomId];
            console.log("i haven't attended ", copyRoom.roomName, "yet. Adding it to my attended array");
            console.log("my attended rooms", currentUser.sessionsAttended);
        }
        navigate(`/peers/${roomId}`);
    };

    return (
        <div className="flex flex-col justify-start gap-4">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-medium">{selectedRoom.roomName}</h1>
                <span className="text-md text-slate-500">with {selectedRoom.hostFirstName} {selectedRoom.hostLastName}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
                <Clock size={16} />
                {selectedRoomId == rooms[0].roomId ?
                    <span>All day</span> :
                    <span>{formatRoomDuration(selectedRoom.duration)} left</span>
                }

            </div>

            <span>{selectedRoom.description}</span>

            <div className="mt-4 grid grid-cols-2">

                {/**Room Features */}
                <div className="flex flex-col gap-2">

                    <span className="font-semibold text-md">Room Features</span>

                    <div className="flex gap-2 text-sm items-center text-slate-900">
                        <div className={`${intentOptions[selectedRoom.intent]} w-5 h-5 rounded-lg`}></div>
                        <span>{selectedRoom.intent}</span>
                    </div>

                    <div className="flex gap-2 text-sm text-slate-900 items-center">
                        {selectedRoom.subject === "Anything" ?
                            <BookOpenText strokeWidth={1.5} size={20} /> :
                            <Book strokeWidth={1.5} size={20} />}
                        <span>{selectedRoom.subject}</span>
                    </div>

                    {selectedRoom.cameraRequired && (
                        <div
                            title="Camera Required"
                            className="flex gap-2 text-sm text-slate-900 items-center"
                        >
                            <Video strokeWidth={1.5} size={20} />
                            <span>Camera Required</span>
                        </div>
                    )}

                </div>

                {/**People */}
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-md">Who's in?</span>

                    <div className="flex gap-3 items-center">
                        <div className="flex -gap-1">
                            {selectedRoom.currentParticipants.slice(0, 3).map((p) => {
                                return <img src={p.picture}
                                    className="rounded-lg w-8 h-8 -ml-1" />
                            })}
                        </div>

                        <span className="text-sm text-slate-900"> & {selectedRoom.currentParticipants.length - selectedRoom.currentParticipants.slice(0, 3).length} other students</span>
                    </div>

                </div>


            </div>

            {/**About the Host Section */}
            <div className="flex flex-col gap-2 mb-2">
                <span className="font-semibold text-md">About The Host</span>
                <div

                    className="flex gap-2 text-sm text-slate-900 items-center"
                >
                    {!isSelectedBetterCampus && <University strokeWidth={1.5} size={20} />}
                    {isSelectedBetterCampus ?
                        <span>{selectedHost.firstName} is a {selectedHost.year} at {selectedHost.university}.</span>
                        : <span>{selectedHost.university}</span>
                    }
                </div>

            </div>

            {/* Join button */}
            <div className="">
                <button
                    type="button"
                    onClick={() => handleJoin(selectedRoom.roomId)}
                    className="
                inline-flex items-center justify-center gap-2 rounded-full 
                px-4 py-2 text-sm font-medium transition shadow-md hover:cursor-pointer
                
                  text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500 
                  hover:shadow-lg hover:-translate-y-[1px]   
                "
                >
                    Join Session
                </button>
            </div>

        </div>

    )
}

export default SelectedRoomDetails;