import { preventEnterSubmit } from "../../helpers/preventEnterSubmit";
import { useState } from "react";
import {X} from 'lucide-react';

function Keywords({setAppliedFilters, appliedFilters}){
    const [keyword, setKeyword] = useState("");

    return(
        <>
        <div className="flex gap-6 justify-between items-center">
                    {/**Keywords */}
                    <div className="flex flex-col gap-2 w-1/2">
                      <span>Keywords</span>

                      <input
                        type="text"
                        value={keyword}
                        placeholder="Any keywords in room descriptions"
                        className="text-sm border-b border-slate-900 outline-none"
                        onChange={(e) => {
                          setKeyword(e.target.value.trim());
                        }}
                        onKeyDown={(e) => { preventEnterSubmit(e) }} />
                      <button
                        className="text-xs rounded-md bg-black text-blue-500 text-white font-medium w-1/3 p-0.5 hover:cursor-pointer hover:bg-transparent hover:text-blue-500 hover:outline hover:outline-blue-500 hover:duration-150 active:bg-blue-500 active:text-white active:outline active:outline-offset-2"
                        type="button"
                        onClick={(e) => {
                          setAppliedFilters({ ...appliedFilters, keywords: [...appliedFilters.keywords, keyword] });
                          setKeyword("");
                        }}>Add</button>

                    </div>

                  </div>

                  {appliedFilters.keywords.length > 0 ?
                    <div className="flex gap-1 w-1/2 flex-wrap">
                      {appliedFilters.keywords.map((k) => {
                        return <div className="flex items-center rounded-md bg-slate-100 px-2 py-1">
                          <X size={12} className="text-slate-500 hover:cursor-pointer hover:bg-slate-150 hover:duration-150 active:bg-slate-200 active:duration-150 rounded-lg"
                            onClick={(e) => {
                              const removedItem = appliedFilters.keywords.filter(keyword => keyword != k);
                              setAppliedFilters({ ...appliedFilters, keywords: removedItem });
                            }} />
                          <span className="text-xs text-slate-500">{k}</span>
                        </div>
                      })}
                    </div> : null}
        </>
    )
}

export default Keywords;