import { useEffect, useState, useContext } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {Search} from 'lucide-react';
import findHost from "../../helpers/findHost";

function SearchBar({appliedFilters, setAppliedFilters, setFilteredRooms, setShowFilters, defaultFilters, setIsNoRoomsFound}) {
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const currentUser = useContext(CurrentUserContext);
    const {rooms, setRooms} = useContext(RoomsContext);

    function handleSearch(e) {
        e.preventDefault();
        console.log("my search submitted", searchInput);

        //Make sure to reset filters on a search, so start search on default all rooms
        setAppliedFilters(defaultFilters);
        setShowFilters(false);
        setSearch(searchInput); //trigger our effect that handles search with filters

    }


  //Run this effect when our appliedFilters change or rooms change which may 
  // cause our displayed filteredRooms to need to be rerendered
  useEffect(() => {

    //Return if rooms hasn't loaded yet
    if (!rooms) return;

    //Initially reset isNoRoomsFound
    setIsNoRoomsFound(false);

    //Step 1: Filter rooms based on search.
    //Check if there is a search, then filteredResults should be based off search not rooms
    const s = search.toLowerCase().trim();
    console.log("my search from useEffect now", s);

    let baseRooms = rooms;

    if(s){
      baseRooms = rooms.filter((r) => {

        const rN = r.roomName.toLowerCase().trim();
        const hostFN = r.hostFirstName.toLowerCase().trim();
        const hostLN = r.hostLastName.toLowerCase().trim();

        return rN.includes(s) || hostFN.includes(s) || hostLN.includes(s) 
        || s.includes(rN) || s.includes(hostFN) || s.includes(hostLN)
      
      });;
    }else{
      //No search or empty string search, just render all rooms
      //Don't update baseRooms
    }

    let hasIntentFilter;
    let hasKeywordsFilter;
    let hasSubjectFilter;
    let hasUniversityFilter;

    if (appliedFilters.intent != "") {
      hasIntentFilter = true;
    } else {
      hasIntentFilter = false;
    }

    if (appliedFilters.subject != "") {
      hasSubjectFilter = true;
    } else {
      hasSubjectFilter = false;
    }

    if (appliedFilters.keywords.length > 0) {
      hasKeywordsFilter = true;
    } else {
      hasKeywordsFilter = false;
    }

    if (appliedFilters.university === "All Universities") {
      hasUniversityFilter = false;
    } else {
      hasUniversityFilter = true;
    }

    console.log("these are my existing filters rn", hasIntentFilter, hasKeywordsFilter, hasSubjectFilter, hasUniversityFilter);

    const hasRegularFilters = hasIntentFilter || hasKeywordsFilter || hasSubjectFilter;
    const anyFilterActive = hasRegularFilters || hasUniversityFilter;

    //Step 2: Filter rooms more based on regular filters.
    
    let filtered;
    //filters exist, but search submitted rendered no results: so filtered empty
    if(baseRooms.length == 0){
      filtered = baseRooms;
    }else{ //filters and search submitted had matching results, so filter now
      filtered = baseRooms.filter((room) => {
      const desc = (room.description || '').toLowerCase();

      //Check if the room matches the vibe filter. If user didn't select a vibe, this room will automatically return false
      const matchesIntent = hasIntentFilter && room.intent === appliedFilters.intent;
      console.log("these are my matches by intent", matchesIntent, "for room", room.hostFirstName);

      //Check if the room matches the subject filter.
      const matchesSubject = hasSubjectFilter && room.subject === appliedFilters.subject;

      //Check if the room description includes any of the keywords inputted by user. If user didn't input any keywords, this room will automatically return false
      const matchesKeywords = hasKeywordsFilter && appliedFilters.keywords.some((kw) => {
        console.log(kw);
        return desc.includes(kw.toLowerCase())
      });

      //Check if the room's host user university field matches the current user's university
      const host = findHost(room.hostFirstName, room.hostLastName, room.hostEmail);

      console.log("found host", host);
      console.log("my uni", currentUser.university);

      const matchesUniversity = hasUniversityFilter && (currentUser.university.toLowerCase() === host.university.toLowerCase() || host.university.toLowerCase().includes(currentUser.university.toLowerCase()));

      //For regular filters, include room if it matches any of the regular filters: OR
      const passRegularFilters = !hasRegularFilters || (matchesIntent || matchesSubject || matchesKeywords);

      //For our super filter "University", include room if it also matches the University: AND
      const passUniversityFilter = !hasUniversityFilter || matchesUniversity;

      // Step 3: Our final displayed rooms will also be based on if it matches our "super filter" University.
      console.log(matchesIntent, matchesSubject, matchesKeywords, matchesUniversity);
      return passRegularFilters && passUniversityFilter;
      
    });
  }

    //If there were no rooms that match filters and search existed but had no matching results, display error message that asks user if they want to join the general Study Hall
    if (filtered.length == 0 && (s || anyFilterActive)) {
      setIsNoRoomsFound(true);
    } else {
      setIsNoRoomsFound(false);
    }

    console.log("After filters, this is my filtered rooms ", filtered);
    setFilteredRooms(filtered);

  }, [rooms, appliedFilters, search]);

    return (
        //Search Wrapper
        <div className="mt-3 mb-2 rounded-xl border border-slate-200 bg-white w-full shadow-sm backdrop-blur flex items-center p-2">

            {/* Search */}
            <form className="flex items-center w-full pl-2 "
                onSubmit={(e) => handleSearch(e)}>
                <Search className="pointer-events-none text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Find a study room"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-lg bg-white p-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:bg-white"
                />
            </form>

            <button
                type='button'
                className="rounded-lg bg-black font-semibold py-2 px-3 text-sm text-white transition duratino-150 hover:cursor-pointer hover:bg-white hover:border hover:border-black hover:text-black hover:duration-150 active:bg-blue-500 active:outline active:outline-offset-2 active:outline-black active:duration-300 "
                onClick={() => {
                    setShowFilters(true);
                }}>Filters
            </button>

        </div>
    )
}
export default SearchBar