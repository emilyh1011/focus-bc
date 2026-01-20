import formatRoomDuration from "../../helpers/formatRoomDuration";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Peers Session Recap View: after a user clicks on the "Leave" session button or host ends session for all
function Recap({room}) {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-5xl px-6 max-w-xl pt-16 text-center">
            <h1 className="mb-4 text-4xl font-extrabold">Session Complete!</h1>
            <p className="mb-12 text-lg text-slate-500">
                You stayed focused with {room.hostFirstName}'s {room.roomName}.
            </p>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur mb-8 flex justify-around p-8">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{formatRoomDuration(room.duration)}</div>
                    <div className="text-xs uppercase text-slate-500">Focused</div>
                </div>

                <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-500">{currentUser.sessionsAttended.length}</div>
                    <div className="text-xs uppercase text-slate-500">Peers Sessions Attended</div>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur mb-8 text-left p-6">
                <label className="mb-4 block font-semibold">Quick Reflection</label>
                <textarea
                    placeholder="How did it go? What did you accomplish?"
                    className="h-24 w-full resize-none rounded-md border border-slate-300 bg-white p-4 text-slate-900 outline-none focus:border-blue-500 focus:outline-blue-200"
                />
            </div>

            <div className="flex justify-center gap-4">
                <button
                    className="inline-flex items-center justify-center gap-2
                            rounded-full px-6 py-3 text-sm font-medium transition shadow-sm
                            
                            text-slate-500
                            bg-transparent hover:bg-slate-50
                            transition hover:cursor-pointer"
                    type="button"
                    onClick={() => navigate('/peers')}
                >
                    Back to Rooms
                </button>
                <button
                    className=" inline-flex items-center justify-center gap-2
                                rounded-full px-6 py-3 text-sm font-medium transition shadow-md
        
                                text-white bg-gradient-to-r from-teal-400 to-blue-500
                                hover:shadow-lg hover:-translate-y-[1px] hover:cursor-pointer"
                    type="button"
                    onClick={() => navigate('/dashboard')}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}
export default Recap