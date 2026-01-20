import { useState, useEffect, useContext } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Currency } from "lucide-react";

function Dropdowns({ config, setConfig, setEntries }) { 
    const currentUser = useContext(CurrentUserContext);

    const [scDropdownOpen, setSCDropdownOpen] = useState(false);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
    const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

    const typeToKey = {
        "assignment": "assignments",
        "note": "notes",
        "study set": "studysets",
    }

    //Run this effect whenever user changes one of the dropdown values to update if entries is rendered
    useEffect(() => {
        //Whenever an input field changes, always start by resetting selected entry and entries
        setConfig({ ...config, entry: null });
        setEntries([]);

        console.log("at beginning my use effect", config.studyOrComplete, config.assignmentType, config.courseName);

        //If one isn't selected, don't render any entries. User needs to select all to see all assignments/notes/studyset
        if (!currentUser.courses || !config.studyOrComplete || !config.assignmentType || !config.courseName) {
            return;
        }

        //Filter for courseName, then that specific type
        let selectedCourse = currentUser.courses.find((course) => course.courseName === config.courseName);

        const selectedTypeArray = typeToKey[config.assignmentType] || null;
        console.log(selectedTypeArray);

        //Entries array will store all entries from the selected course's assignment type
        let e = selectedCourse[selectedTypeArray] || [];
        console.log("my e", e);


        setEntries(e);
    }, [config.assignmentType, config.courseName, config.studyOrComplete])

    return (
        <div className="flex gap-2 items-center flex-wrap px-4">

            <span className="text-xl font-semibold px-2 text-center tracking-wide">I am</span>

            {/**Studying/Completing Dropwdown*/}
            <div className="flex flex-col px-2 relative w-1/3">
                <div className="flex gap-1 items-center text-md text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                    <input type="text"
                        className="text-center w-full focus:outline-none"
                        readOnly
                        placeholder=""
                        value={config.studyOrComplete} />
                    {scDropdownOpen ?
                        <IoIosArrowUp size={16}
                            onClick={() => setSCDropdownOpen(!scDropdownOpen)} />
                        :
                        <IoIosArrowDown size={16}
                            onClick={() => {
                                setSCDropdownOpen(!scDropdownOpen);
                                //Make sure no other dropdowns are open too
                                setTypeDropdownOpen(false);
                                setCoursesDropdownOpen(false);
                            }
                            } />
                    }
                </div>


                {scDropdownOpen ?
                    <div className="absolute right-0 top-12 flex flex-col bg-white w-full text-sm rounded-lg gap-2 p-2 z-50 shadow-sm">


                        {["", "studying", "completing"].map((val) => {
                            return <div className="text-center rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                onClick={() => {
                                    setConfig({ ...config, studyOrComplete: val });
                                    setSCDropdownOpen(false);

                                }}>
                                {val}
                            </div>
                        })}
                    </div>
                    : null}
            </div>

            <span className="text-xl font-semibold px-2 text-center tracking-wide">a</span>

            {/**Assignment/Note/StudySet Dropwdown*/}
            <div className="flex flex-col px-2 w-1/3 relative">
                <div className="flex gap-1 items-center text-md text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                    <input type="text"
                        className="text-center w-full focus:outline-none"
                        readOnly
                        placeholder=""
                        value={config.assignmentType} />
                    {typeDropdownOpen ?
                        <IoIosArrowUp size={16}
                            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)} />
                        :
                        <IoIosArrowDown size={16}
                            onClick={() => {
                                setTypeDropdownOpen(!typeDropdownOpen)
                                //Make sure no other dropdowns are open too
                                setSCDropdownOpen(false);
                                setCoursesDropdownOpen(false);
                            }} />}
                </div>


                {typeDropdownOpen ?
                    <div className="absolute z-50 right-0 top-12 flex flex-col bg-white w-full text-sm rounded-lg gap-2 p-2 shadow-sm">


                        {["", "assignment", "note", "study set"].map((val) => {
                            return <div className="text-center rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                onClick={() => {
                                    setConfig({ ...config, assignmentType: val });
                                    setTypeDropdownOpen(false);

                                }}>
                                {val}
                            </div>
                        })}
                    </div>
                    : null}
            </div>


            <span className="text-xl font-semibold px-2 text-center tracking-wide">for</span>

            {/**Course options Dropdown*/}
            <div className="flex flex-col px-2 relative w-1/2">
                <div className="flex gap-1 items-center text-md text-teal-400 font-semibold px-2 py-2 rounded-lg bg-teal-100 hover:cursor-pointer">
                    <input type="text"
                        className="text-center w-full focus:outline-none"
                        readOnly
                        placeholder=""
                        value={config.courseName} />
                    {coursesDropdownOpen ?
                        <IoIosArrowUp size={16}
                            onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)} />
                        :
                        <IoIosArrowDown size={16}
                            onClick={() => {
                                setCoursesDropdownOpen(!coursesDropdownOpen)
                                //Make sure no other dropdowns are open too
                                setSCDropdownOpen(false);
                                setTypeDropdownOpen(false);
                            }} />}
                </div>


                {coursesDropdownOpen ?
                    <div className="absolute z-50 right-0 top-12 flex flex-col bg-white w-full text-sm rounded-lg gap-2 p-2 shadow-sm">


                        {[{ courseName: "" }, ...currentUser.courses].map((course) => {
                            return <div className="text-center rounded-md p-2 hover:cursor-pointer hover:bg-teal-100"
                                onClick={() => {
                                    setConfig({ ...config, courseName: course.courseName });
                                    setCoursesDropdownOpen(false);

                                }}>
                                {course.courseName}
                            </div>
                        })}
                    </div>
                    : null}

            </div>

        </div>
    )
}
export default Dropdowns