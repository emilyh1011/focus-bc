import { RoomsContext } from "../../contexts/RoomsContext";
import { useContext, useState } from "react";
import { PiHandsClapping } from "react-icons/pi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import IntentionDropdowns from "./IntentionDropdowns";
//Peers Room Intentions Sidebar
function IntentionsSidebar({ room }) {
    const currentUser = useContext(CurrentUserContext);
    const { rooms, setRooms } = useContext(RoomsContext);

    const defaultIntention = {
        intentionId: crypto.randomUUID(),
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        universityEmail: currentUser.universityEmail,
        picture: currentUser.picture,
        university: currentUser.university,
        major: currentUser.major,
        intention: "",
        kudos: 0, //The number of emoji supports a person recieved from other users
        kudosFrom: [],
        done: false,
        assignment: null
    };


    const existing = room.intentions.find(
        (i) =>
            i.universityEmail === currentUser.universityEmail &&
            i.firstName === currentUser.firstName &&
            i.lastName === currentUser.lastName &&
            !i.done
    ) || defaultIntention;

    //When we switch sidebar views(ex: to ChatSidebar), IntentionSidebar unmounts and local currentIntention dies,
    //so we need to make sure a user's incompleted intention isn't lost from b4 sidebar switch
    const [currentIntention, setCurrentIntention] = useState(existing);
    const [goalDescription, setGoalDescription] = useState(existing.intention || '');
    const [isDoneTypingGoal, setIsDoneTypingGoal] = useState(existing.intention !== "");
    const gMaxLength = 150;

    //Render all intentions except for current user's current intention.
    //Can render current user's past completed intentions
    console.log("starting intentions", room.intentions);
    let intentions;
    if (room.intentions.length > 0) {
        intentions = room.intentions;
    } else {
        intentions = [];
    }

    //Only hide your current intention, since it will appear in the current intention box
    const displayedIntentions = intentions.filter(
        (i) =>
            !(i.universityEmail === currentUser.universityEmail &&
                i.firstName === currentUser.firstName &&
                i.lastName === currentUser.lastName &&
                !i.done)
    );
    console.log("after join room's intentions", room.intentions);

    //When a user chooses an assignment, only one dropdown can be active at once
    const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
    const [entryDropdownOpen, setEntryDropdownOpen] = useState(false);
    const [courseNameInput, setCourseNameInput] = useState(existing.assignment?.courseName || "");
    const [assignmentTypeInput, setAssignmentTypeInput] = useState(existing.assignment?.type || "");
    const [entry, setEntry] = useState(existing.assignment?.entry || "");

    //when assignment fields state changes, rereuns function and recalculates these
    const selectedCourse = currentUser.courses.find(c => c.courseName === courseNameInput) || null;

    function handleSaveIntention(e) {
        //Add it to intentions list to render, but if you are the current user, don't render your own current intention since it will be in your own box
        //Only user's completed intentions will render with everyone elses intentions
        e.preventDefault();

        let newAssignment = null;
        //"Self Studying" option allows a user to clear their results. Self Studying will result in a null intention.assignment field
        if (courseNameInput && courseNameInput != "Self Studying" && assignmentTypeInput && entry) {
            newAssignment = {
                courseNumber: selectedCourse.courseNumber,
                courseName: courseNameInput,
                type: assignmentTypeInput,
                entry: entry,
            }
        }

        const copyIntention = { ...currentIntention, intention: goalDescription, assignment: newAssignment };

        // Create a copyIntentions where remove intention from room.intentions and replace with copyIntention
        // Create a copyRoom where remove intentions and replace with copyIntentions
        const removedIntention = room.intentions.filter((i) => i.intentionId !== copyIntention.intentionId);
        const copyIntentions = [...removedIntention, copyIntention];
        const copyRoom = { ...room, intentions: copyIntentions };

        //Find room & remove from rooms, and replace with copyRoom.
        // const removedRoom = rooms.filter(r => r.roomId !== room.roomId);
        // setRooms([...removedRoom, copyRoom]);
        const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
        if (ogIndex === -1) return; // safety check

        const newRooms = [...rooms];
        newRooms[ogIndex] = copyRoom;

        setRooms(newRooms);

        //Update local current intention to be in sync for UI
        setCurrentIntention(copyIntention);

    }
    function handleCompleteIntention(e) {
        e.preventDefault();

        const completedIntention = { ...currentIntention, done: true };

        //Find intention, remove, and put in updated version where done field set to true
        const removedIntention = room.intentions.filter((i) => i.intentionId !== completedIntention.intentionId);
        const copyIntentions = [...removedIntention, completedIntention];
        const copyRoom = { ...room, intentions: copyIntentions };

        //Find room & remove from rooms, and replace with copyRoom
        // const removedRoom = rooms.filter(r => r.roomId !== room.roomId);
        // setRooms([...removedRoom, copyRoom]);
        const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
        if (ogIndex === -1) return; // safety check

        const newRooms = [...rooms];
        newRooms[ogIndex] = copyRoom;

        setRooms(newRooms);

        console.log("my intention now done, gonna render now");

        //Reset form (input field, doneTyping) , and reset to a new currentIntention object
        setGoalDescription("");
        setIsDoneTypingGoal(false);
        setCurrentIntention(defaultIntention);
        setCourseNameInput("");
        setCoursesDropdownOpen(false);
        setAssignmentTypeInput("");
        setTypeDropdownOpen(false);
        setEntry("");
        setEntryDropdownOpen(false);
    }

    function handleAddKudos(i) {
        console.log("adding to this intention", i);

        //Current User can Increment kudos as long as Current User hasn't already clicked kudos & intention wasn't created by self
        let checkKudos = false;
        if (i.kudosFrom.length > 0) {
            checkKudos = true;
        }

        let isInKudos;

        if (checkKudos) {
            console.log("intention email", i.universityEmail);
            console.log("my email", currentUser.universityEmail);
            console.log(i.universityEmail === currentUser.universityEmail);
            isInKudos = i.kudosFrom.some(u => u.universityEmail === currentUser.universityEmail) || i.universityEmail === currentUser.universityEmail;
            //If kudosFrom empty but currentUser, need to do check here
        } else {
            if (i.universityEmail === currentUser.universityEmail) {
                isInKudos = true;
            } else {
                isInKudos = false;
            }
        }

        if (isInKudos) {
            //do nothing
        } else {

            //Copy and replace intention in room.intentions
            //Copy and replace room in rooms
            const kudosCopy = i.kudos + 1;
            const copyIntention = { ...i, kudos: kudosCopy, kudosFrom: [...i.kudosFrom, currentUser] };
            console.log("my new intention after add kudos", copyIntention);

            const ogIntentionIndex = room.intentions.findIndex(intention => intention.intentionId === copyIntention.intentionId); //Replace with this for preserve ordering
            if (ogIntentionIndex === -1) return; // safety check

            const newIntentions = [...room.intentions];
            newIntentions[ogIntentionIndex] = copyIntention;
            const copyRoom = { ...room, intentions: newIntentions };

            //Find room & remove from rooms, and replace with copyRoom
            // const removedRoom = rooms.filter(r => r.roomId !== room.roomId);
            // setRooms([...removedRoom, copyRoom]);
            const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
            if (ogIndex === -1) return; // safety check

            const newRooms = [...rooms];
            newRooms[ogIndex] = copyRoom;

            setRooms(newRooms);
        }
    }
    return (
        <div className="rounded-xl border border-zinc-100 bg-white shadow-sm backdrop-blur flex w-6/16 flex-col py-4 px-2 overflow-scroll gap-2">
            <div className="border-b border-slate-200 pb-2 font-semibold">
                <span>Intentions Board:</span>
            </div>

            <form
                onSubmit={handleCompleteIntention}
                className="mt-4 flex flex-col gap-2 rounded-xl border border-slate-200 p-4"
            >
                <div className="mb-1 flex items-center gap-2 text-sm text-slate-700">
                    <img src={currentUser.picture} className="h-8 w-8 rounded-full border border-slate-200" />
                    <span className="font-semibold text-md">My Intention:</span>
                </div>
                {isDoneTypingGoal ?
                    <span className="text-sm text-slate-700">{currentIntention.intention}</span>

                    :
                    <div className="relative">
                        <textarea
                            rows={3}

                            maxLength={150}
                            value={goalDescription}
                            onChange={(e) => setGoalDescription(e.target.value)}
                            placeholder="Set your intentions for this session."
                            className="w-full resize-none border-none bg-transparent text-sm text-slate-900 outline-none"
                        />
                        <span className="absolute text-xs right-0 -bottom-3 text-slate-500">{goalDescription.length} / {gMaxLength}</span>
                    </div>
                }

                {isDoneTypingGoal ?
                    <div className="flex flex-col  gap-8 text-xs font-medium">

                        <div className="flex justify-between">
                            {currentIntention.assignment ?
                                <span className="inline-flex flex-wrap text-xs text-slate-400 font-semibold px-2 py-1 rounded-lg bg-slate-100 hover:outline hover:outline-slate-200 hover:cursor-pointer">
                                    {currentIntention.assignment.courseName}: {currentIntention.assignment.entry}
                                </span>
                                : <span className="inline-flex flex-wrap text-xs text-slate-400 font-semibold px-2 py-1 rounded-lg bg-slate-100 hover:outline hover:outline-slate-200 hover:cursor-pointer">
                                    Self Studying
                                </span>
                            }
                            <button type="button"
                                className="inline-flex gap-1 text-sm items-center justify-center rounded-full outline outline-slate-200 px-2 py-1 hover:cursor-pointer hover:duration-150 hover:bg-slate-50 active:outline-blue-300">
                                <PiHandsClapping size={16} />
                                {currentIntention.kudos > 0 ? currentIntention.kudos : null}
                            </button>
                        </div>

                        <div className="flex gap-2 justify-start">
                            <button className="rounded-full px-4 py-2 hover:cursor-pointer bg-zinc-100"
                                type="button"
                                onClick={() => setIsDoneTypingGoal(false)}>
                                Edit
                            </button>
                            <button className="rounded-full px-4 py-2 hover:cursor-pointer bg-blue-500 text-white"
                                type="submit"
                            >
                                Complete
                            </button>
                        </div>

                    </div> :
                    <div className="flex justify-between items-start mt-3">

                        <div className="flex flex-col gap-4">
                            {/**Select Course, Type, Assignment/Note/StudySet */}
                            <IntentionDropdowns
                                courseNameInput={courseNameInput} setCourseNameInput={setCourseNameInput}
                                assignmentTypeInput={assignmentTypeInput}
                                setAssignmentTypeInput={setAssignmentTypeInput}
                                entry={entry} setEntry={setEntry}
                                coursesDropdownOpen={coursesDropdownOpen}
                                setCoursesDropdownOpen={setCoursesDropdownOpen}
                                typeDropdownOpen={typeDropdownOpen}
                                setTypeDropdownOpen={setTypeDropdownOpen}
                                entryDropdownOpen={entryDropdownOpen}
                                setEntryDropdownOpen={setEntryDropdownOpen} />

                            <button
                                type="button"
                                className="rounded-full w-3/7 px-2 py-2 text-xs font-medium transition shadow-sm
                                    text-white shadow-md bg-gradient-to-r from-teal-400 to-blue-500 
                                    hover:shadow-lg hover:-translate-y-[1px] text-sm hover:cursor-pointer"
                                onClick={(e) => {
                                    //After initial save for a new intention, user now has 2 button choices, Complete or Edit
                                    //Make sure all dropdowns are set to closed
                                    setCoursesDropdownOpen(false);
                                    setTypeDropdownOpen(false);
                                    setEntryDropdownOpen(false);
                                    setIsDoneTypingGoal(true);
                                    handleSaveIntention(e);
                                }}
                            >
                                Save
                            </button>
                        </div>

                        <button type="button"
                            className="inline-flex gap-1 text-sm items-center justify-center rounded-full outline outline-slate-200 px-2 py-1 hover:cursor-pointer hover:duration-150 hover:bg-slate-50 active:outline-blue-300">
                            <PiHandsClapping size={16} />
                            {currentIntention.kudos > 0 ? currentIntention.kudos : null}
                        </button>

                    </div>}

            </form>
            {displayedIntentions.length > 0 ?
                <div className="flex flex-col gap-2">
                    {displayedIntentions.map((i) => {
                        return <div className="flex flex-col border border-slate-200 rounded-lg p-4 gap-2">
                            <div className="flex items-center gap-2">
                                <img src={i.picture} className="w-9 h-9 rounded-full" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-700">{i.firstName} {i.lastName}</span>
                                    <span className="text-xs text-slate-500">{i.major} @ {i.university}</span>
                                </div>
                            </div>
                            <span className="text-sm text-slate-700">{i.intention}</span>

                            {i.done ?

                                <div className="flex items-center justify-between gap-3">

                                    {/**Did user specify an assignment(all fields filled)? If not, self studying */}
                                    {i.assignment != null ?
                                        <div>
                                            <span className="inline-flex flex-wrap text-xs text-green-400 font-semibold px-2 py-1 rounded-lg bg-green-100 hover:outline hover:outline-green-200 hover:cursor-pointer">{i.assignment.courseName}: {i.assignment.entry}</span>
                                        </div>
                                        : <div className="flex items-center gap-1">
                                            <span className="inline-flex flex-wrap text-xs text-green-400 font-semibold px-2 py-1 rounded-lg bg-green-100 hover:outline hover:outline-green-200 hover:cursor-pointer">Self Studying</span>
                                        </div>}

                                    <button type="button"
                                        className={`inline-flex gap-1 text-xs items-center justify-center rounded-lg outline outline-slate-200 px-2 py-1 hover:cursor-pointer hover:duration-150 active:outline-blue-300 ${i.kudosFrom && i.kudosFrom.some(i => i.universityEmail === currentUser.universityEmail) ? "font-semibold" : ""}`}
                                        onClick={() => {
                                            handleAddKudos(i);
                                        }}>
                                        <PiHandsClapping size={16} />
                                        {i.kudos > 0 ? i.kudos : null}
                                    </button>


                                </div>

                                :
                                <div className="flex justify-between gap-3 items-center">

                                    {i.assignment != null ?
                                        <div>
                                            <span className="inline-flex flex-wrap text-xs text-slate-400 font-semibold px-2 py-1 rounded-lg bg-slate-100 hover:outline hover:outline-slate-200 hover:cursor-pointer">{i.assignment.courseName}: {i.assignment.entry}</span>
                                        </div>
                                        : <div className="flex items-center gap-1">
                                            <span className="inline-flex flex-wrap text-xs text-slate-400 font-semibold px-2 py-1 rounded-lg bg-slate-100 hover:outline hover:outline-slate-200 hover:cursor-pointer">Self Studying</span>
                                        </div>}
                                    <button type="button"
                                        className={`inline-flex gap-1 text-xs items-center justify-center rounded-lg outline outline-slate-200 px-2 py-1 hover:cursor-pointer hover:duration-150 active:outline-blue-300 ${i.kudosFrom && i.kudosFrom.some(i => i.universityEmail === currentUser.universityEmail) ? "font-semibold" : ""}`}
                                        onClick={() => {
                                            handleAddKudos(i);
                                        }}>
                                        <PiHandsClapping size={16} />
                                        {i.kudos > 0 ? i.kudos : null}
                                    </button>
                                </div>
                            }

                        </div>
                    })}
                </div>
                : null
            }
        </div>
    );
}

export default IntentionsSidebar