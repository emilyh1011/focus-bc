import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//Peers room session- Intention Dropdowns inside Intention Sidebar
function IntentionDropdowns({courseNameInput, setCourseNameInput, assignmentTypeInput, 
        setAssignmentTypeInput, entry, setEntry, coursesDropdownOpen, setCoursesDropdownOpen,
        typeDropdownOpen, setTypeDropdownOpen, entryDropdownOpen, setEntryDropdownOpen}) {

    const currentUser = useContext(CurrentUserContext);

    const typeToKey = {
        Assignment: "assignments",
        Note: "notes",
        "Study Set": "studysets",
    };

    //when assignment fields state changes, rereuns function and recalculates these
    const selectedCourse = currentUser.courses.find(c => c.courseName === courseNameInput) || null;

    //If input value was reset, then selectedTypeArray can take null value
    const selectedTypeArray = typeToKey[assignmentTypeInput] || null;

    //Entries array will store all entries from the selected course's assignment type
    //Only assign our entries array if the selectedCourse and selectedTypeArray aren't null
    //Bracket notation because selectedTypeArray is not an actual field for a course object in currentUser.courses. Use bracket accessing pattern for dynamic object fields
    const entries = (selectedCourse && selectedTypeArray) ? selectedCourse[selectedTypeArray] || [] : [];

    return (
        <div className="flex flex-col gap-2">
            {/**Course Name */}
            <div className="flex flex-col">
                <div className="flex gap-1 items-center text-xs text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                    <input type="text"
                        className="focus:outline-none"
                        readOnly
                        placeholder="Add a course"
                        value={courseNameInput} />
                    {coursesDropdownOpen ?
                        <IoIosArrowUp size={16}
                            onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)} />
                        :
                        <IoIosArrowDown size={16}
                            onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)} />}
                </div>


                {/**At beginning, only courses dropdown shows */}
                {coursesDropdownOpen ?
                    <div className="flex flex-col bg-slate-50 w-full text-xs rounded-lg gap-2 p-2">
                        <span className="font-medium text-slate-900">Select a course</span>

                        {[{ courseName: "Self Studying" }, ...currentUser.courses].map((c) => {
                            return <div className="rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                onClick={() => {
                                    setCourseNameInput(c.courseName);
                                    setCoursesDropdownOpen(false);

                                    //Reset later dropdown values
                                    setAssignmentTypeInput("");
                                    setEntry("");
                                }}>
                                {c.courseName}
                            </div>
                        })}
                    </div> : null}
            </div>

            {/**After selecting a valid course, assignmentType dropdown shows  */}
            {courseNameInput && courseNameInput != "Self Studying" ?
                <div className="flex flex-col">
                    <div className="flex gap-1 items-center text-xs text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                        <input type="text"
                            className="focus:outline-none"
                            readOnly
                            placeholder="Type"
                            value={assignmentTypeInput} />
                        {typeDropdownOpen ?
                            <IoIosArrowUp size={16}
                                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)} />
                            :
                            <IoIosArrowDown size={16}
                                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)} />}
                    </div>


                    {typeDropdownOpen ?
                        <div className="flex flex-col bg-slate-50 w-full text-xs rounded-lg gap-2 p-2">
                            <span className="font-medium text-slate-900">Select an assignment type</span>

                            {["Assignment", "Note", "Study Set"].map((t) => {
                                return <div
                                    className="rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                    onClick={() => {
                                        setAssignmentTypeInput(t);
                                        setTypeDropdownOpen(false);

                                        //Reset later dropdown values
                                        setEntry("");
                                    }}>
                                    {t}
                                </div>
                            })}
                        </div> : null}


                </div> : null}

            {/**After selecting an assignmentType, either assignments, notes, or studysets show for that class */}
            {assignmentTypeInput ?
                <div className="flex flex-col">
                    <div className="flex gap-1 items-center text-xs text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                        <input type="text"
                            className="focus:outline-none"
                            readOnly
                            placeholder="Entry"
                            value={entry} />
                        {entryDropdownOpen ?
                            <IoIosArrowUp size={16}
                                onClick={() => setEntryDropdownOpen(!entryDropdownOpen)} />
                            :
                            <IoIosArrowDown size={16}
                                onClick={() => setEntryDropdownOpen(!entryDropdownOpen)} />}
                    </div>


                    {entryDropdownOpen ?
                        <div className="flex flex-col bg-slate-50 w-full text-xs rounded-lg gap-2 p-2 overflow-y-auto max-h-40">
                            <span className="font-medium text-slate-900">Select a {assignmentTypeInput.toLowerCase()}</span>

                            {entries.map((entry) => {
                                return <div
                                    className="rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                    onClick={() => {
                                        setEntry(entry.name ? entry.name : entry);
                                        setEntryDropdownOpen(false);
                                    }}>
                                    {entry.name ? entry.name : entry}
                                </div>
                            })}
                        </div> : null}

                </div> : null}
        </div>

    )
}
export default IntentionDropdowns;