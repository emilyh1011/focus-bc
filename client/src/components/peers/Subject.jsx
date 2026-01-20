import { subjectOptions } from '../../helpers/subjectOptions.jsx';
import {X} from 'lucide-react'

function Subject({appliedFilters, setAppliedFilters}) {
    
    return (
        <div className="flex flex-col gap-2 w-1/2">
            <label className="font-md">Subject</label>

            <select

                value={appliedFilters.subject}
                onChange={(e) => {
                    setAppliedFilters({ ...appliedFilters, subject: e.target.value });
                }}
                className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-900 outline-none hover:cursor-pointer
                                               focus:border-blue-500 focus:outline-blue-200"
            >
                {subjectOptions.map(({ name }) => {

                    return <option key={name} value={name}>{name}</option>

                })}
            </select>
            {/**Not empty string "" means theres a selection */}
            {appliedFilters.subject ?
                <div className="flex items-center gap-0.5">
                    <X className="text-slate-500 hover:cursor-pointer hover:bg-slate-50 active:bg-slate-100 rounded-lg" size={12}
                        onClick={(e) => {
                            setAppliedFilters({ ...appliedFilters, subject: "" })
                        }} />
                    <span className="text-xs text-slate-500">Clear Selection</span>
                </div>

                : null
            }

        </div>
    )
}
export default Subject;