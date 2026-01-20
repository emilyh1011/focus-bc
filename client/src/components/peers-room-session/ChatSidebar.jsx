import { useState, useContext } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ChatSidebar({ room }) {
    const currentUser = useContext(CurrentUserContext);
    const { rooms, setRooms } = useContext(RoomsContext);
    const [chatInput, setChatInput] = useState("");

    function handleSubmitChat(e) {
        if (e.key == "Enter") {
            e.preventDefault(); //Prevent Enter default behavior of inserting a new line

            console.log("we submit now");
            //Remove old room
            const newChat = [...room.chat, { chatId: crypto.randomUUID(), firstName: currentUser.firstName, lastName: currentUser.lastName, universityEmail: currentUser.universityEmail, picture: currentUser.picture, university: currentUser.university, chat: chatInput }];
            const copyRoom = { ...room, chat: newChat };

            const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
            if (ogIndex === -1) return; // safety check

            //Copy and replace with updated chat
            const newRooms = [...rooms];
            newRooms[ogIndex] = copyRoom;
            setRooms(newRooms);

            //Reset chat input
            setChatInput("");
        }
    }

    return (
        <div className="rounded-xl border border-zinc-100 bg-white shadow-sm backdrop-blur flex w-6/16 flex-col py-4 px-2 overflow-scroll gap-2">
            <div className="border-b border-slate-200 pb-2 font-semibold">
                Room Chat
            </div>
            {/**Chats */}
            <div className="flex flex-col h-full overflow-y-auto px-4 py-2 gap-2">
                {room.chat.length > 0 && room.chat.map(c =>
                    <div className="flex flex-col">
                        <div className="mb-1 text-xs text-slate-500">{c.firstName} {c.lastName}</div>
                        <span className={`rounded-md ${c.universityEmail !== currentUser.universityEmail ? "bg-slate-100" : "bg-sky-100"} px-2 py-2 text-xs text-slate-900`}>
                            {c.chat}
                        </span>
                    </div>
                )}
            </div>
            {/**Add a chat */}
            <form className="border-t border-slate-200 p-4">
                <textarea
                    rows={1}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                        handleSubmitChat(e);
                    }}
                    placeholder="Type a message..."
                    className="max-h-20 field-sizing-content resize-none w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:outline-blue-200"
                />

            </form>
        </div>
    )
}

export default ChatSidebar;