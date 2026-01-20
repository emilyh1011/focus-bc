//After user chooses studying/completing, assignment/note/studyset, and course name, entries are rendered
import {Calendar} from 'lucide-react';

function Entries({config, setConfig, entries}) {
    
    return (
        <div className="flex flex-col bg-slate-50/70 rounded-lg shadow-sm px-4 py-2 gap-8">

            {/**Only assignments have due dates and should be 2 grid columns */}
            {config.assignmentType === "assignment" ?
                <div className="flex flex-col">

                    <div className="grid grid-cols-[1fr_2fr] items-center bg-black p-2 rounded-md text-white font-medium mb-1">
                        <div className="flex gap-2 items-center">
                            <Calendar size={18} className="" />
                            <span className="text-sm ">Due Date</span>
                        </div>

                        <span className="text-sm  ">Assignment</span>


                    </div>

                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto bg-white rounded-md">
                        {entries.map((a) => {

                            return (
                                <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => { setConfig({ ...config, entry: a }) }}
                                    className={`
                                                            rounded-md w-full grid grid-cols-[1fr_2fr] items-start text-left px-4 py-2 text-sm transition
                                                        ${config.entry && config.entry.id === a.id
                                            ? "transition duration-150 bg-teal-50 border border-teal-300"
                                            : "transition duration-150 hover:bg-slate-100 hover:cursor-pointer"
                                        }`}
                                >
                                    <span className="text-slate-600 tabular-nums">
                                        {a.due}
                                    </span>
                                    <span className="text-slate-900 font-medium">
                                        {a.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                </div> :
                <div className="flex flex-col">
                    <div className="flex items-center bg-black px-4 py-2 rounded-md text-white font-medium mb-1">

                        {config.assignmentType == "note" ?
                            <span className="text-sm  ">Note</span> :
                            <span className="text-sm  ">Study Set</span>
                        }



                    </div>
                    <div className="flex flex-col gap-1 max-h-60 bg-white rounded-md overflow-auto">
                        {entries.map((e) => {
                            return (<div className={`p-2  text-sm rounded-md w-full font-medium text-slate-900 hover:cursor-pointer ${config.entry && config.entry === e ? "transition duration-150 bg-teal-50 border border-teal-300" : "transition duration-150 hover:bg-slate-100"}`}
                                onClick={() => { setConfig({ ...config, entry: e }) }}>
                                {e.name}
                            </div>)
                        })}
                    </div>
                </div>
            }


        </div>
    )
}
export default Entries;