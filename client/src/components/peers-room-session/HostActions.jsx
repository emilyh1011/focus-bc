import Switch from '@mui/material/Switch';
import { useContext, useState } from 'react';
import { RoomsContext } from '../../contexts/RoomsContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ContactRound, X } from "lucide-react";
import { preventEnterSubmit } from '../../helpers/preventEnterSubmit';

//Peers room, Host Actions sidebar
function HostActions({ room, setSessionState }) {
    const currentUser = useContext(CurrentUserContext);
    const { rooms, setRooms } = useContext(RoomsContext);

    const [userRemoveQuery, setUserRemoveQuery] = useState("");
    const [removeUsers, setRemoveUsers] = useState([]);
    const [filteredRemoveUsers, setFilteredRemoveUsers] = useState([]);
    const [hideFilteredRemoveUsers, setHideFilteredRemoveUsers] = useState(false);
    const [isEndAll, setIsEndAll] = useState(false);

    function handleRemoveSearch(e) {
        setUserRemoveQuery(e.target.value);
        console.log(e.target.value);

        const query = e.target.value.toLowerCase();
    
        //Use participants because can't remove self this way
        const participants = room.currentParticipants.filter(user => user.universityEmail != currentUser.universityEmail);

        const matches = participants.filter((user) => {
            //Check to make sure the the userRemoveQuery is actually not empty
            //Filter search results if we see the first name, last name, or username start to match.
            const matchedUser = e.target.value && (user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.universityEmail.toLowerCase().includes(query));
            return matchedUser;

        }).slice(0, 5); //Only display at most 5 matched results
        setFilteredRemoveUsers(matches);
    }

    function handleRemoveUsers(e, removeParticipants) {
        e.preventDefault();

        if (removeParticipants.length > 0) {


            //For each user, remove their intentions and remove them from currentParticipants
            //When current user leaves, remove current user from rooms' currentParticipants and remove their intentions from rooms' intentions
            //Create a new currentParticipants and new intentions without removed users
            const removeUsersEmails = removeParticipants.map(r => r.universityEmail);
            const newParticipants = room.currentParticipants.filter(p => !removeUsersEmails.includes(p.universityEmail));

            const newIntentions = room.intentions.filter(i => !removeUsersEmails.includes(i.universityEmail));

            //To do this, we need to remove the room, copy it, and replace it with updated fields
            const copyRoom = { ...room, currentParticipants: newParticipants, intentions: newIntentions };

            const ogIndex = rooms.findIndex(r => r.roomId === copyRoom.roomId); //Replace with this for preserve ordering
            if (ogIndex === -1) return; // safety check

            const newRooms = [...rooms];
            newRooms[ogIndex] = copyRoom;

            setRooms(newRooms);
            setRemoveUsers([]);
        }
    }

    function handleEndSessionAll(e) {
        setIsEndAll(true);
        console.log("ending for all", room.currentParticipants);
        const everyone = room.currentParticipants;
        handleRemoveUsers(e, everyone);
        setSessionState("recap");
    }

    return (
        <div className="rounded-xl border border-zinc-100 bg-white shadow-sm backdrop-blur flex w-6/16 flex-col py-4 px-2 overflow-scroll gap-2">
            <div className="border-b border-slate-200 pb-2 font-semibold">
                <span>Host Actions:</span>
            </div>

            <div className="flex flex-col gap-4 px-4">
                <div className="flex flex-col">
                    <span className="text-sm font-medium">Camera Requirement</span>
                    <Switch
                        checked={room.cameraRequired}
                        onChange={(e) => {
                            const copyRoom = { ...room, cameraRequired: !room.cameraRequired };
                            const removedRoom = rooms.filter(r => r.roomId != room.roomId);
                            setRooms([...removedRoom, copyRoom]);
                        }} />
                </div>

                <div className="flex flex-col rounded-lg justify-center">
                    <span className="text-sm font-medium mb-2">Kick Users</span>

                    <form className="flex flex-col gap-1">

                        <div className="flex flex-col gap-2">
                            {/**Search Bar & FilteredResults*/}
                            <div className="flex w-full">

                                {/**User Search Bar Wrapper, only apply outline when focus-within(the inner input is focused) */}
                                <div className="flex rounded-lg px-3 py-2  w-full gap-2 items-center bg-slate-50 drop-shadow-md hover:bg-slate-50 hover:cursor-pointer focus-within:outline focus-within:outline-blue-500">

                                    <ContactRound size={18} />
                                    {/**Actual Input Bar */}
                                    <input type="text"
                                        value={userRemoveQuery}
                                        placeholder="Remove a user."
                                        className="w-full text-sm focus:outline-none hover:cursor-pointer"
                                        onChange={(e) => {
                                            handleRemoveSearch(e);
                                        }}
                                        onBlur={() => {
                                            setHideFilteredRemoveUsers(true);
                                        }}
                                        onFocus={() => {
                                            setHideFilteredRemoveUsers(false);
                                        }}
                                        onKeyDown={(e) => preventEnterSubmit(e)}
                                    >
                                    </input>
                                </div>

                            </div>


                            {/**Filtered Results */}
                            <div className="flex flex-col w-full">
                                {/**Once we select a user, stop showing filtered search results & clear the search query
                                     * Or once a user loses focus from search bar, stop showing filtered search results
                                     */}
                                {!hideFilteredRemoveUsers && userRemoveQuery && filteredRemoveUsers.length > 0 && filteredRemoveUsers.map((user) => {
                                    return (
                                        <div key={user.universityEmail} className="flex rounded-xl bg-white p-1 gap-2 items-center hover:bg-slate-50 hover:cursor-pointer active:bg-slate-100"
                                            //OnClick fires after onMouseDown and possible onFocus/onBlur --> Problem: Think clicked on search result but onblur(hid filtered search results). 
                                            // Result clicked on disappears from underneath before could click to add user.
                                            onMouseDown={(e) => {     //onMouseDown fires instantly after clicking to add user
                                                e.preventDefault(); //Prevent onBlur default behavior of re-rendering(from updating hilteredResults state) that hid list long enough to add user

                                                //Only add selected user if not already in remove list, check by comparing unique email addresses.
                                                const isUserInRemove = removeUsers.some((r) => r.universityEmail === user.universityEmail);
                                                console.log(isUserInRemove);


                                                if (isUserInRemove) {
                                                    //Don't add, already invited.
                                                } else {
                                                    setRemoveUsers([...removeUsers, user]); //Like Google Drive, after click on user, rendered in a list
                                                }

                                                setUserRemoveQuery('');
                                                setFilteredRemoveUsers([]);
                                            }}>

                                            <img src={user.picture} className="w-6 h-6 rounded-lg" />

                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-900">{user.firstName} {user.lastName}</span>
                                                <span className="text-xs text-slate-500">{user.universityEmail}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/**Render the people to be removed */}
                            {!isEndAll && removeUsers ?
                                <div className={`flex flex-wrap w-full items-center gap-1 ${removeUsers.length > 0 ? "mb-1" : ""}`}>

                                    {removeUsers.map(user =>
                                        <div key={user.universityEmail} className="flex rounded-lg items-center bg-white py-1 px-2 gap-1 outline outline-slate-400 hover:bg-slate-50 hover:duration-150 hover:cursor-pointer">
                                            <div className="flex items-center gap-1">
                                                <img src={user.picture}
                                                    className="w-6 h-6 rounded-lg" />
                                                <span className="text-xs text-slate-900">{user.firstName} {user.lastName}</span>
                                            </div>

                                            <X size={18}
                                                className="text-slate-500 hover:cursor-pointer hover:bg-slate-100 hover:duration-150"
                                                onClick={() => {
                                                    //Copy and replace a new array without user from remove list.
                                                    const withoutRemovee = removeUsers.filter((r) => r.universityEmail !== user.universityEmail);
                                                    setRemoveUsers(withoutRemovee);
                                                }} />
                                        </div>

                                    )}
                                </div> : null}


                        </div>

                        <button type="submit"
                            className="bg-black text-sm text-white font-medium rounded-lg py-1 px-2 w-1/4 transition hover:cursor-pointer hover:bg-transparent hover:outline hover:outline-black hover:text-black hover:duration-150 active:duration-150 active:outline-offset-2 "
                            onClick={(e) => handleRemoveUsers(e, removeUsers)}>Kick</button>


                    </form>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">End Session For all</span>
                    <button className="bg-red-500 opacity-90 text-sm text-white font-medium rounded-lg py-1 px-2 w-1/4 transition hover:cursor-pointer hover:bg-transparent hover:outline hover:outline-red-500 hover:text-red-500 hover:duration-150 active:duration-150 active:outline-offset-2 "
                        onClick={(e) => handleEndSessionAll(e)}>End</button>
                </div>
            </div>


        </div>
    )

}

export default HostActions;