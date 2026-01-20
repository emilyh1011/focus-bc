import {intentNames} from "../../helpers/intentNames";
import {X} from 'lucide-react';

function Intent({appliedFilters, setAppliedFilters}){

    return (
        <div className="flex flex-col gap-2 w-1/2">
                    <span>Intent</span>

                    <div className="flex gap-2">
                      {intentNames.map((i) => {
                        return <span
                          className={`rounded-lg hover:cursor-pointer py-1 px-2 text-sm ${appliedFilters.intent == i ? "duration-150 bg-blue-500" : "duration-150 border border-slate-200 hover:bg-slate-50 active:bg-slate-100"} `}
                          onClick={() => {
                            setAppliedFilters({ ...appliedFilters, intent: i });
                          }}
                        >{i}</span>
                      })}

                    </div>

                    {/**Not empty string "" means theres a selection */}
                    {appliedFilters.intent ?
                      <div className="flex items-center gap-0.5">
                        <X className="text-slate-500 hover:cursor-pointer hover:bg-slate-50 active:bg-slate-100 rounded-lg" size={12}
                          onClick={(e) => {
                            setAppliedFilters({ ...appliedFilters, intent: "" });
                          }} />
                        <span className="text-xs text-slate-500">Clear Selection</span>
                      </div>

                      : null
                    }
                  </div>
    )
}
export default Intent;
