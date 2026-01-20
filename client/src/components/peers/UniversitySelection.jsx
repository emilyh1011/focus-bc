import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function UniversitySelection({appliedFilters, setAppliedFilters}){
    const currentUser = useContext(CurrentUserContext);
    
    return (
         <div className="flex gap-2 justify-start w-full">
            <button
              type='button'
              className={`rounded-lg py-2 px-3 text-sm
                hover:cursor-pointer active:outline active:outline-blue-300
                ${appliedFilters.university === "All Universities" ? "transition duration-150 bg-white text-slate-900 shadow-md font-semibold hover:duration-150 "
                  : "transition duration-150 text-slate-400 font-medium hover:bg-slate-50 hover:duration-150"}`}
              onClick={() => {
                setAppliedFilters({ ...appliedFilters, university: "All Universities" });
              }}>All Universities
            </button>
            <button
              type='button'
              className={`rounded-lg py-2 px-3 text-sm
                hover:cursor-pointer active:outline active:outline-blue-300
               ${appliedFilters.university === currentUser.university ? "transition duration-150 bg-white text-slate-900 shadow-md font-semibold hover:duration-150 "
                  : "transition duration-150 text-slate-400 font-medium hover:bg-slate-50 hover:duration-150"}`}
              onClick={() => {
                setAppliedFilters({ ...appliedFilters, university: currentUser.university });
              }}>{currentUser.university}
            </button> 
    </div>  
    )
}       
export default UniversitySelection
